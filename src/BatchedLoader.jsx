import React from "react";
import Context from "./context";
import invariant from "invariant";
import PropTypes from "prop-types";

class BatchedLoader extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: [],
      fetchNextBatch: this.fetchNextBatch.bind(this),
      loadedCount: 0,
      totalCount: 0
    };
  }

  __generateDummyLoad() {
    let dummyLoaders = [];
    let count = this.props.batchSize;
    while (count > 0) {
      const index = Math.abs(count - this.props.batchSize);
      const newDummyLoader = { index, loading: true };
      dummyLoaders = dummyLoaders.concat(newDummyLoader);
      count--;
    }
    return dummyLoaders;
  }

  async __fetchCount() {
    const { baseModel, params } = this.props;
    try {
      const client = this.context;
      const response = await client.count(baseModel, params);
      this.setState({ totalCount: response.data });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async fetchNextBatch() {
    const { data, loadedCount } = this.state;
    const { baseModel, batchSize } = this.props;
    try {
      this.setState({
        data: data.concat(this.__generateDummyLoad())
      });
      const client = this.context;
      const params = {
        ...this.props.params,
        offset: loadedCount,
        limit: batchSize
      };
      const response = await client.read(baseModel, params);
      const loadedData = data.concat(response.data);
      this.setState({
        data: loadedData,
        loadedCount: loadedData.length
      });
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async componentDidMount() {
    const client = this.context;
    invariant(
      client,
      "You must wrap your app in a Provider" +
        " component in order to use the BatchedLoader component."
    );

    await this.__fetchCount();
    await this.fetchNextBatch();
  }

  componentDidUpdate(prevProps) {
    invariant(
      prevProps.baseModel === this.props.baseModel,
      "The BatchedLoader was not designed" +
        " to handle prop changes after component mount. The baseModel prop changed after mount."
    );

    invariant(
      prevProps.params === this.props.params,
      "The BatchedLoader was not designed" +
        " to handle prop changes after component mount. The params prop changed after mount."
    );
  }

  render() {
    const { children } = this.props;
    invariant(
      children,
      "The BatchedLoader component must render a child component."
    );
    return children(this.state);
  }
}

BatchedLoader.defaultProps = {
  params: {},
  batchSize: 10
};

BatchedLoader.propTypes = {
  baseModel: PropTypes.string.isRequired,
  params: PropTypes.object,
  batchSize: PropTypes.number
};

export default BatchedLoader;
