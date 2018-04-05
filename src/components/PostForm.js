import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { newPost, modifyPost } from '../actions/posts';
import { fetchCategories } from '../actions/categories';

import uuid from 'uuid/v4';

class PostForm extends Component {

    state = {
        title: '',
        titleError: '',
        author: '',
        authorError: '',
        body: '',
        bodyError: '',
        category: '1',
        categoryError: '',
        isEditingPost: false,
    }


    componentDidMount() {
        this.props.fetchCategories();
        if (this.props.post.id) {
            this.setState({
                ...this.props.post,
                isEditingPost: true
            })
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChange = (event, index, value) => this.setState({ category: value });

    onSubmit(e) {
        e.preventDefault();
        if (this.isValidForm()) {
            if (this.state.isEditingPost) {
                this.props.updatePost(this.props.post.id, {
                    title: this.state.title,
                    body: this.state.body
                });
            } else {
                this.props.newPost({
                    id: uuid(),
                    timestamp: Date.now(),
                    ...this.state
                });
            }
            this.props.closeModal();
            this.setState({
                title: '',
                author: '',
                body: '',
                category: '1'
            });
        }
    }

    isValidForm() {
        let isValid = true;
        let errors = {
            titleError: '',
            authorError: '',
            bodyError: '',
            categoryError: ''
        }
        if (this.state.author.trim() === '' && !this.state.isEditingPost) {
            isValid = false;
            errors.authorError = 'Author is required.'
        }
        if (this.state.body.trim() === '') {
            isValid = false;
            errors.bodyError = 'Body is required.'
        }
        if (this.state.title.trim() === '') {
            isValid = false;
            errors.titleError = 'Title is required.'
        }
        if (this.state.category.trim() === '1') {
            isValid = false;
            errors.categoryError = 'Category is required.'
        }
        this.setState({
            ...this.state,
            ...errors
        });
        return isValid;
    }

    render() {
        return (
            <div>
                <TextField errorText={this.state.titleError} name="title" value={this.state.title} floatingLabelText="Title" fullWidth={true} onChange={(e) => this.onChange(e)} />
                <TextField errorText={this.state.authorError} name="author" value={this.state.author} floatingLabelText="Author" fullWidth={true} onChange={(e) => this.onChange(e)} disabled={this.state.isEditingPost} />
                <TextField errorText={this.state.bodyError} name="body" value={this.state.body} floatingLabelText="Body" fullWidth={true} multiLine={true} rows={3} onChange={(e) => this.onChange(e)} />
                <SelectField disabled={this.state.isEditingPost}  errorText={this.state.categoryError} floatingLabelText="Categories" style={{ verticalAlign: "bottom" }} value={this.state.category} onChange={this.handleChange}> 
                    <MenuItem value={"1"} primaryText="Select a category..." />
                    {this.props.categories.map((category) => (
                        <MenuItem key={category.path} value={category.path} primaryText={category.name} />
                    ))}
                </SelectField>
                <div style={{ marginLeft: 640 }}>
                    {this.state.isEditingPost ? <RaisedButton primary={true} label="Edit" onClick={(e) => this.onSubmit(e)} />
                        : <RaisedButton primary={true} label="Create" onClick={(e) => this.onSubmit(e)} />
                    }
                </div>

            </div>
        );
    }
};

function mapStateToProps({ categories, post }) {
    return {
        categories,
        post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newPost: (body) => dispatch(newPost(body)),
        updatePost: (postId, body) => dispatch(modifyPost(postId, body)),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);