import React from 'react';
import MdAutoComplete from 'material-ui/AutoComplete';

export default class AutoComplete extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            data: [],
            searchText: ''
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps && nextProps.value) {
            let searchText = nextProps.value[nextProps.dataConfig.text];
            this.setState({ searchText });
        } else {
            this.setState({ searchText: '' });
        }
    }

    onSearchTextChange (searchText) {
        this.props.onChange(null, () => {
            this.setState({ searchText });
        });

        this.props.data(searchText).then((data) => {
            this.setState({ data });
        });
    }

    onChange (item) {
        if (item !== this.state.searchText) {
            this.props.onChange(item);
        }
    }

    render () {
        return (
            <MdAutoComplete className="auto-complete"
                            hintText={this.props.placeholder}
                            dataSource={this.state.data}
                            dataSourceConfig={this.props.dataConfig}
                            searchText={this.state.searchText}
                            onUpdateInput={this.onSearchTextChange.bind(this)}
                            onNewRequest={this.onChange.bind(this)}
                            style={{ display: 'flex', width: '100%' }}
                            filter={MdAutoComplete.noFilter}
                            textFieldStyle={{
                                width: '100%',
                                height: 'auto',
                                flex: 1,
                                border: 'none',
                                background: 'none',
                                fontSize: '12px',
                                fontFamily: 'Graphik',
                                color: 'rgb(122, 122, 122)',
                                letterSpacing: '-0.3px',
                                padding: 0
                            }} />
        );
    }
}
