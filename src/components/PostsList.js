import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Votes from './Votes';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
    fetchPosts,
    fetchPostsByCategory,
    updatePost,
    clearPost,
    deletePost,
} from '../actions/posts';
import {
    fetchCategories
} from '../actions/categories';
import {
    changeSort
} from '../actions/sorting';
import Dialog from 'material-ui/Dialog';
import PostForm from './PostForm';

class PostsList extends Component {
    state = {
        postModal: false,
        selectValueNewPost: "1",

    };

    componentDidMount() {
        this.props.fetchCategories();
        if (this.props.selectValue !== "1") {
            return this.props.fetchPostsByCategory(this.props.selectValue);
        }
        return this.props.receivePosts();
    };

    orderBy(field) {
        this.props.sorting.actualOrder[field] === 'asc' ? this.props.changeSorting({
            fieldToOrder: field,
            actualOrder: Object.assign({}, this.props.sorting.actualOrder, { [field]: 'desc' })
        }) : this.props.changeSorting({
            fieldToOrder: field,
            actualOrder: Object.assign({}, this.props.sorting.actualOrder, { [field]: 'asc' })
        })
    }

    handleCategoryChange = (event, index, value) => {
        if (value !== "1") {
            this.props.fetchPostsByCategory(value);
            return this.props.history.push(`/${value}`)
        }
        return this.props.history.push('/');
    };

    openPostModal = (isNewPost) => {
        if (isNewPost) {
            this.props.clearPost();
        }
        this.setState({ postModal: true });
    }

    closePostModal = () => {
        this.props.clearPost();
        this.setState({ postModal: false });
    }

    handleCategoryChangeNewPost = (event, index, value) => {
        this.setState({ selectValueNewPost: value });
    }

    onEdit(post) {
        this.props.updatePost(post);
        this.openPostModal();
    }

    onDelete(post) {
        this.props.deletePost(post.id);
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
                <RaisedButton className="btnNewTopic" label="New Post" primary={true} icon={<ContentAdd />} onClick={() => this.openPostModal(true)} />
                <div>
                    <SelectField style={{ verticalAlign: "bottom", marginLeft: 300, marginTop: 0 }} value={this.props.selectValue} onChange={this.handleCategoryChange} >
                        <MenuItem value={"1"} primaryText="All Categories" />
                        {this.props.categories.map((category) => (
                            <MenuItem key={category.path} value={category.path} primaryText={category.name} />
                        ))}
                    </SelectField>
                    <FlatButton primary={true} label="Date" onClick={() => this.orderBy('timestamp')}
                        icon={
                            this.props.sorting.fieldToOrder === 'timestamp' ?
                                this.props.sorting.actualOrder.timestamp === 'asc' ? <ArrowUpward /> : <ArrowDownward /> : null
                        }
                    />
                    <FlatButton style={{ marginLeft: 5 }} primary={true} label="Votes" onClick={() => this.orderBy('voteScore')}
                        icon={
                            this.props.sorting.fieldToOrder === 'voteScore' ?
                                this.props.sorting.actualOrder.voteScore === 'asc' ? <ArrowUpward /> : <ArrowDownward /> : null
                        }
                    />
                </div>
                {
                    this.props.posts.length > 0 ?
                        <Table fixedHeader={false} style={{ width: "auto", tableLayout: "auto", marginLeft: "300px", marginTop: 20 }} selectable={false}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                                <TableRow>
                                    <TableHeaderColumn></TableHeaderColumn>
                                    <TableHeaderColumn style={{ width: "500px" }}>Topic</TableHeaderColumn>
                                    <TableHeaderColumn>Category</TableHeaderColumn>
                                    <TableHeaderColumn>Author</TableHeaderColumn>
                                    <TableHeaderColumn></TableHeaderColumn>
                                    <TableHeaderColumn></TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} >
                                {this.props.posts.map((post) =>
                                    (
                                        <TableRow key={post.id}>
                                            <TableRowColumn><Votes content={post} vote={this.props.vote} /></TableRowColumn>
                                            <TableRowColumn style={{ width: "500px" }}>
                                                <Link to={`/${post.category}/${post.id}`} style={{ textDecoration: "none", fontSize: "20px" }}>{post.title}</Link>
                                                <div style={{ marginTop: 5 }}>
                                                    <Link to={`/${post.category}/${post.id}`} style={{ textDecoration: "none", color: "#79D7E5" }}>{post.commentCount} comments</Link>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <div style={{ marginBottom: 23 }}>
                                                    <label style={{ fontSize: 14 }}>{post.category}</label>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <div style={{ marginBottom: 23 }}>
                                                    <label style={{ fontSize: 14 }}>{post.author}</label>
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <IconButton style={{ marginBottom: 23 }}>
                                                    <ModeEdit color='#039BE5' onClick={() => this.onEdit(post)} />
                                                </IconButton>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <IconButton style={{ marginBottom: 23 }}>
                                                    <Delete color='#E53935' onClick={() => this.onDelete(post)} />
                                                </IconButton>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        : <div style={{ marginLeft: 285, marginTop: 20 }}>
                            <FlatButton label="No posts found." disabled={true} />
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
        )
    }
}

function applyOrder(posts, fieldToOrder, actualOrder) {
    return _.orderBy(posts, [fieldToOrder], [actualOrder[fieldToOrder]]);
}

function mapStateToProps({ posts, comments, categories, sorting, post }) {
    return {
        posts: applyOrder(posts, sorting.fieldToOrder, sorting.actualOrder),
        comments,
        categories,
        sorting,
        post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeSorting: (data) => dispatch(changeSort(data)),
        receivePosts: () => dispatch(fetchPosts()),
        fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
        updatePost: (post) => dispatch(updatePost(post)),
        clearPost: () => dispatch(clearPost()),
        deletePost: (postId) => dispatch(deletePost(postId)),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList));
