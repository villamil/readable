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
    changeComment
} from '../actions/comments';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import uuid from 'uuid/v4';
import Dialog from 'material-ui/Dialog';
import PostForm from './PostForm';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import normalizeDate from '../utils/helpers';

class PostDetails extends Component {

    constructor()  {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        postModal: false,
        isValidPost: true,
        editingCommentId: 0,
    }

    async componentDidMount() {
        await this.props.receivePost(this.props.match.params.id);
        if (this.props.post.category !== this.props.match.params.category || this.props.post.id !== this.props.match.params.id) {
            this.setState({
                isValidPost: false
            });
        }
        this.props.receiveComments(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearComments();
        this.props.clearPost();
    }

    onSubmit({ body, author }) {
        console.log(this.state.editingCommentId);
        if (this.state.editingCommentId === 0) {
            this.props.postComment({
                id: uuid(),
                timestamp: Date.now(),
                body,
                author,
                parentId: this.props.post.id
            });
        } else {
            this.props.changeComment(this.state.editingCommentId, {
                timestamp: Date.now(),
                body,
            });
            this.setState({
                editingCommentId: 0
            })
        }
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

    onEditComment(commentId) {
        this.setState({
            editingCommentId: commentId
        });
    }

    cancelEditComment() {
        this.setState({
            editingCommentId: 0
        })
    }

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
                                <p style={{ color: "#1FBCD3" }}>Date: {normalizeDate(this.props.post.timestamp)}</p>
                            </div>
                            <div style={{ marginLeft: 12 }}>
                                <p style={{ color: "#1FBCD3" }}>Replies: {this.props.comments.length}</p>
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

                        <CommentForm onSubmit={this.onSubmit} />

                        {this.props.comments.length > 0 ? this.props.comments.map((comment) => (
                            <div key={comment.id}>

                                {this.state.editingCommentId === comment.id ?
                                    <div>
                                        <CommentForm comment={comment} cancelEditComment={() => this.cancelEditComment()} onSubmit={this.onSubmit} />
                                    </div>
                                    :
                                    <div className="container" >
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
                                            <IconMenu
                                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                                                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                            >
                                                <MenuItem primaryText="Edit" onClick={() => this.onEditComment(comment.id)} />
                                                <MenuItem primaryText="Delete" onClick={() => this.props.deleteComment(comment.id)} />
                                            </IconMenu>
                                        </div>

                                    </div>
                                }

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
        updatePost: (postId, body) => dispatch(updatePost(postId, body)),
        changeComment: (commentId, body) => dispatch(changeComment(commentId, body))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));