import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Navigation extends Component {

    render() {
        const { categories, changeSortBy } = this.props
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact onClick={() => this.props.changeCategory('all')} activeClassName='active'>
                            All
                        </NavLink>
                    </li>
                    {categories.map(c => (
                    <li key={c.name}>
                        <NavLink to={`/${c.path}`} exact onClick={() => this.props.changeCategory(c.name)} activeClassName='active'>
                            {c.name}
                        </NavLink>
                    </li>
                    ))}
                    <li>
                        <NavLink to={'/new_post'} exact activeClassName='active'>
                            New post
                        </NavLink>
                    </li>
                    {this.props.location.pathname !== '/new_post' &&
                    <li>
                        Sort by: 
                        <select onChange={changeSortBy}>
                            <option value='votes'>Votes</option>
                            <option value='dates'>Dates</option>
                        </select>
                    </li>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    }
}

export default connect(mapStateToProps)(withRouter(Navigation))