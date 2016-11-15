import React, { Component, PropTypes } from 'react';
import TimeAgo from 'react-timeago';

const propTypes = {
    data: PropTypes.object,
    ownership: PropTypes.bool,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    index: React.PropTypes.number
};

const defaultProps = {
    data: {
        _id: 'id1234',
        writer: 'writer',
        contents: 'contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true,
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    onRemove: (id, index) => {
        console.error('onRemove function not defined');
    },
    index: -1
};

class Memo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.data.contents
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    toggleEdit() {
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;

            this.props.onEdit(id, index, contents).then(() => {
                this.setState({
                    editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    handleRemove() {
        let id = this.props.data._id,
            index = this.props.index;
        this.props.onRemove(id, index);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const { data, ownership } = this.props;

        const dropDownMenu = (
          <div className="option-button">
              <a className='dropdown-button'
                   id={`dropdown-button-${data._id}`}
                   data-activates={`dropdown-${data._id}`}>
                  <i className="material-icons icon-button">more_vert</i>
              </a>
              <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                  <li><a onClick={this.toggleEdit}>Edit</a></li>
                  <li><a onClick={this.handleRemove}>Remove</a></li>
              </ul>
          </div>
        );

        const createdInfo = (
             <span> wrote a log · <TimeAgo date={this.props.data.date.created}/></span>
        );

        const editedInfo = (
            <span style={{color: '#AAB5BC'}}> edited a log ·  <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <a className="username">
                    {this.props.data.writer}</a>
                    { this.props.data.is_edited ? editedInfo : createdInfo }
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );

        const editView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}>
                        </textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );


        return(
            <div className="container memo">
                { this.state.editMode ? editView : memoView }
           </div>
        );
    }

}

Memo.propTypes = propTypes;
Memo.defaultProps = defaultProps;

export default Memo;
