import React, { Component } from 'react';
import Votes from './Votes';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {
    fetchPost,
    clearPost,
    deletePost,
    updatePost
} from '../actions/posts';
import {
    fetchComments,
    clearComments,
    postComment,
    deleteComment,
} from '../actions/comments';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import uuid from 'uuid/v4';
import Dialog from 'material-ui/Dialog';
import PostForm from './PostForm';



class PostDetails extends Component {

    state = {
        postModal: false,
        isValidPost: true
    }

    normalizeDate(timestamp) {
        const date = new Date(timestamp)
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
    }

    async componentDidMount() {
        await this.props.receivePost(this.props.match.params.id);
        if (this.props.post.category !== this.props.match.params.category || this.props.post.id !== this.props.match.params.id) {
            this.setState({
                isValidPost: false
            });
        }
        console.log(this.props.post);
        this.props.receiveComments(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearComments();
        this.props.clearPost();
    }

    onSubmit({ body, author }) {
        this.props.postComment({
            id: uuid(),
            timestamp: Date.now(),
            body,
            author,
            parentId: this.props.post.id
        });
    }

    onDelete() {
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/');
    }

    openPostModal = () => {
        this.setState({ postModal: true });
    }

    closePostModal = () => {
        this.setState({ postModal: false });
    }

    onEdit() {
        this.openPostModal();
    }

    modalActions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.closePostModal}
        />
    ]

    render() {
        return (
            <div>
                {this.state.isValidPost ?
                    <div style={{ marginTop: 20 }}>
                        <div className="container">
                            <div>
                                <Votes content={this.props.post} vote={this.props.vote}></Votes>
                            </div>
                            <div>
                                <h1>{this.props.post.title}</h1>
                            </div>
                        </div>
                        <div style={{ marginLeft: 330 }}>
                            <label>{this.props.post.body}</label>
                        </div>
                        <div className="container">
                            <div style={{ marginLeft: 50 }}>
                                <p style={{ color: "#1FBCD3" }}>Author: {this.props.post.author}</p>
                            </div>
                            <div style={{ marginLeft: 12 }}>
                                <p style={{ color: "#1FBCD3" }}>Date: {this.normalizeDate(this.props.post.timestamp)}</p>
                            </div>
                            <div style={{ marginLeft: 12 }}>
                                <IconButton>
                                    <ModeEdit color='#039BE5' onClick={() => this.onEdit()} />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton>
                                    <Delete color='#E53935' onClick={() => this.onDelete()} />
                                </IconButton>
                            </div>
                        </div>
                        <div style={{ marginLeft: 300 }}>
                            <p>Comments:</p>
                        </div>

                        <CommentForm onSubmit={this.onSubmit.bind(this)} />

                        {this.props.comments.length > 0 ? this.props.comments.map((comment) => (
                            <div className="container" key={comment.id}>
                                <div>
                                    <Votes content={comment} vote={this.props.vote}></Votes>
                                </div>
                                <div>
                                    <div>
                                        <p style={{ color: "#1FBCD3", margin: 0 }}>{comment.author}</p>
                                        {comment.body}
                                    </div>

                                </div>
                                <div style={{ marginLeft: 12, marginTop: 18 }}>
                                    <IconButton onClick={() => this.props.deleteComment(comment.id)}>
                                        <Delete color='#E53935' />
                                    </IconButton>
                                </div>

                            </div>
                        )) :
                            <div style={{ marginLeft: 300 }}>
                                <FlatButton label="Be the first comment!" disabled={true} />
                            </div>
                        }

                        <Dialog
                            title={this.props.post.title ? 'Edit Post' : 'New Post'}
                            actions={this.modalActions}
                            modal={false}
                            open={this.state.postModal}
                            onRequestClose={this.closePostModal}
                        >
                            <div>
                                <PostForm closeModal={this.closePostModal} />
                            </div>
                        </Dialog>

                    </div>
                    : <div style={{ marginLeft: 300, marginTop: 50 }}>
                        <h1>Post not found...</h1>
                    </div>}
            </div>
        );
    }
};

function mapStateToProps({ post, comments }) {
    return {
        post,
        comments,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        receiveComments: (postId) => dispatch(fetchComments(postId)),
        receivePost: (postId) => dispatch(fetchPost(postId)),
        clearComments: () => dispatch(clearComments()),
        clearPost: () => dispatch(clearPost()),
        postComment: (body) => dispatch(postComment(body)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        updatePost: (postId, body) => dispatch(updatePost(postId, body))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));