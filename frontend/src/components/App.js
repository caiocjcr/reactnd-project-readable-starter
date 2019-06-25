import React, { Component } from 'react';
import { getAllCategories, getAllPosts } from '../utils/API'
import Navigation from './Navigation'
import { withRouter, Route, Switch } from 'react-router-dom'
import PostList from './PostList';
import PostEdit from './PostEdit'
import PostPage from './PostPage'
import CommentEdit from './CommentEdit'
import { receiveCategories } from '../actions/categories';
import { connect } from 'react-redux'
import { receivePosts } from '../actions/posts';

class App extends Component {
	state = {
		selectedCategory: '',
		sortBy: 'votes'
	}

	componentDidMount() {
		const urlPath = this.props.history.location.pathname
		let selectedCategory

		if(urlPath.slice(1) === '') {
			selectedCategory = 'all'
		} else {
			selectedCategory = urlPath.slice(1)
		}
		Promise.all([getAllCategories(), getAllPosts()])
			.then(([categories, posts]) => {
				this.props.dispatch(receiveCategories(categories))
				this.props.dispatch(receivePosts(posts))
				this.setState({
					selectedCategory
				})
			})
	}

	handleChangeCategory = category => {
		this.setState({
			selectedCategory: category
		})
	}

	handleSortByChange = event => {
		this.setState({
			sortBy: event.target.value
		})
	}

	render() {
		const { selectedCategory, sortBy } = this.state
		const { categories } = this.props
		return (
			<div>
				{categories !== null &&
				<Navigation selected={selectedCategory} changeCategory={this.handleChangeCategory} changeSortBy={this.handleSortByChange}/>
				}
				<Route exact path='/' component={() => <PostList category={{ name: 'all', path: '' }} sortBy={sortBy} />} />
				{categories === null
					? null
					: categories.map(c => (
				<Route key={c.name} exact path={`/${c.path}`} component={() => <PostList category={c} sortBy={sortBy}/>}/>
				))}
				<Route exact path={'/new_post'} component={() => <PostEdit />}/>
				<Switch>
					<Route exact path={'/edit_comment/:commentId'} component={props => <CommentEdit {...props} id={props.match.params.commentId} />} />
					<Route exact path={'/edit_post/:id'} component={props => <PostEdit {...props} id={props.match.params.id} />} />
					<Route exact path={'/:category/:id'} component={props => <PostPage {...props} sortBy={sortBy}/>} />
					<Route exact path={'/:category/:postId/new_comment'} component={props => <CommentEdit {...props} />} />
				</Switch>
			</div>
		)
	}
}

function mapStateToProps({ categories }) {
	return {
		categories
	}
}

export default connect(mapStateToProps)(withRouter(App));
