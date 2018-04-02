import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import PostsList from './PostsList';
import PostDetails from './PostDetails';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { votePost, voteComment, clearPost } from '../actions';


class App extends Component {

  isContentAPost(content) {
    return content.hasOwnProperty('title');
  }

  async vote(score, content) {
    if (this.isContentAPost(content)) {
      return await this.props.updatePostVote(content.id, score);
    }
    return this.props.updateCommentVote(content.id, score);
  }

  render() {
    const appBarStyle = {
      marginLeft: "274px",
      cursor: "pointer"
    };
    return (
      <MuiThemeProvider>
        <div>
          <Route path="/" exact render={(props) => (
            <div>
              <AppBar onTitleClick={() => props.history.push('/')} title="Readable" titleStyle={appBarStyle} showMenuIconButton={false} />
              <PostsList
                vote={this.vote.bind(this)}
                selectValue={"1"}
                history={props.history}
              />
            </div>
          )} />
          <Route path="/:category" exact render={(props) => (
            <div>
              <AppBar onTitleClick={() => props.history.push('/')} title="Readable" titleStyle={appBarStyle} showMenuIconButton={false} />
              <PostsList
                vote={this.vote.bind(this)}
                selectValue={props.match.params.category}
                history={props.history}
                match={props.match}
              />
            </div>
          )} />
          <Route path="/:category/:id" exact render={(props) => (
            <div>
              <AppBar onTitleClick={() => props.history.push('/')} title="Readable" titleStyle={appBarStyle} showMenuIconButton={false} />
              <PostDetails
                match={props.match}
                selectValue={props.match.params.category}
                vote={this.vote.bind(this)}
                history={props.history}
              />
            </div>
          )}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ posts, comments, categories, sorting }) {
  return {
    posts,
    comments,
    categories,
    sorting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePostVote: (postId, vote) => dispatch(votePost(postId, vote)),
    updateCommentVote: (commentId, vote) => dispatch(voteComment(commentId, vote)),
    clearPost: () => dispatch(clearPost())
  }
}

// withRouter https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
