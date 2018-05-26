import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ChartOptionsTimespan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timespan: this.props.timespan,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedOption) {
    let field = selectedOption.key;
    let value = selectedOption.value;

    this.setState({ [field]: value }, () => {
      //update parent container with new timespan

      this.props.updateParent(field, value);
    });
  }

  render() {
    const { timespan } = this.state;
    return (
      <Select
        className="timespan-select"
        value={timespan}
        searchable={false}
        clearable={false}
        onChange={this.handleSelect}
        options={[
          { value: '1m', label: '1m', key: 'timespan' },
          { value: '1h', label: '1h', key: 'timespan' },
          { value: '1d', label: '1d', key: 'timespan' },
          { value: '1M', label: '1M', key: 'timespan' },
        ]}
      />
    );
  }
}

export default ChartOptionsTimespan;
