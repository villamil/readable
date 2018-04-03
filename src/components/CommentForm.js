import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CommentForm extends Component {
    state = {
        author: '',
        authorError: '',
        body: '',
        bodyError: '',
        isEditing: false
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isValidForm() {
        let isValid = true;
        let errors = {
            authorError: '',
            bodyError: ''
        }
        if (this.state.author.trim() === '') {
            isValid = false;
            errors.authorError = 'Author is required.'
        }
        if (this.state.body.trim() === '') {
            isValid = false;
            errors.bodyError = 'Comment is required.'
        }
        this.setState({
            ...this.state,
            ...errors
        });
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValidForm()) {
            this.props.onSubmit(this.state);
            this.setState({
                author: '',
                body: '',
            });
        }
    }

    componentDidMount() {
        if(this.props.comment) {
            this.setState({
                author: this.props.comment.author,
                body: this.props.comment.body,
                isEditing: true
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div style={{ marginLeft: 20 }}>
                    <TextField name="author" value={this.state.author} hintText="Name" onChange={(e) => this.onChange(e)} errorText={this.state.authorError} disabled={this.state.isEditing} />
                </div>
                <div style={{ marginLeft: 20, width: 600 }}>
                    <TextField name="body" value={this.state.body} hintText="Comment ... " fullWidth={true} onChange={(e) => this.onChange(e)} errorText={this.state.bodyError} />
                </div>
                <div style={{ marginLeft: 10 }}>
                    <RaisedButton label={this.state.isEditing ? "Edit" : "Send"} primary={!this.state.isEditing}  onClick={(e) => this.onSubmit(e)} />
                </div>
                {this.state.isEditing ? <div style={{ marginLeft: 10 }}>
                    <RaisedButton label="Cancel" secondary={true}  onClick={() => this.props.cancelEditComment()} />
                </div> : null}
            </div>
        );
    }
}

export default CommentForm;