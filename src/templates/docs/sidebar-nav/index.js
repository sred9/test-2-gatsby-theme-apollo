import Directory from './directory';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import colors from '../../../util/colors';
import styled from '@emotion/styled';
import {Link} from 'gatsby';

const StyledList = styled.ul({
  marginLeft: 0,
  listStyle: 'none'
});

const StyledListItem = styled.li(props => ({
  color: props.active && colors.primary
}));

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none'
});

export default class SidebarNav extends Component {
  static propTypes = {
    contents: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
  };

  renderPages(pages) {
    return (
      <StyledList>
        {pages.map(page => (
          <StyledListItem
            key={page.path}
            active={page.path === this.props.pathname}
          >
            <StyledLink to={page.path}>{page.frontmatter.title}</StyledLink>
          </StyledListItem>
        ))}
      </StyledList>
    );
  }

  render() {
    const {null: root, ...categories} = this.props.contents;
    return (
      <Fragment>
        {this.renderPages(root)}
        {Object.keys(categories).map(key => {
          const pages = categories[key];
          return (
            <Directory
              key={key}
              title={key}
              active={pages.some(page => page.path === this.props.pathname)}
            >
              {this.renderPages(pages)}
            </Directory>
          );
        })}
      </Fragment>
    );
  }
}
