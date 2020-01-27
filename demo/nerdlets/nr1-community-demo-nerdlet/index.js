import React from 'react';
import { Grid, GridItem, TextField, Button, Stack, StackItem } from 'nr1';
import * as PAGES from './pages';
import GitHubIcon from '../../assets/icon-github.svg';

// TO DO - glob from /components and /utilities
const componentList = [
  // { name: 'AccountDropdown', category: 'Components' },
  { name: 'DetailPanel', category: 'Components' },
  { name: 'EmptyState', category: 'Components' },
  { name: 'Timeline', category: 'Components' },
  { name: 'NerdGraphError', category: 'Components' },
  { name: 'timeRangeToNrql', category: 'Utilities' }
];

export default class NerdpackLayoutStandard extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      currentSearchQuery: '',
      currentPage: componentList[0],
      categoryMap: componentList.reduce((previousValue, currentValue) => {
        const category = currentValue.category;

        if (!previousValue[category]) {
          previousValue[category] = [];
        }

        previousValue[category].push(currentValue);

        return previousValue;
      }, {})
    };

    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.searchDocs = this.searchDocs.bind(this);
  }

  handleListItemClick(page) {
    this.setState({ currentPage: page });
  }

  renderByCategories(currentPage) {
    const { categoryMap } = this.state;
    const categories = Object.keys(categoryMap);

    return categories.map((value, index) => {
      const categoryName = value;
      const categoryItems = categoryMap[value];
      return (
        <React.Fragment key={index}>
          <h5 className="primary-nav-category">{categoryName}</h5>
          <ul className="sidebar-list">
            {this.renderCategoryItems(categoryItems, currentPage)}
          </ul>
        </React.Fragment>
      );
    });
  }

  renderSearchResults(currentPage) {
    const { categoryMap, currentSearchQuery } = this.state;
    const categories = Object.keys(categoryMap);

    const menuOutput = categories.map((value, index) => {
      const categoryName = value;
      const categoryItems = categoryMap[value];

      // Do any of the items from this category match the search term?
      // If so, store those matching items in a new array (queryResults).
      const queryResults = categoryMap[categoryName].filter(item => {
        if (item.name !== undefined) {
          return item.name.toLowerCase().includes(currentSearchQuery);
        }

        return undefined;
      });

      // If the search query matches any results from this category return
      // those items and their category header.
      if (queryResults.some(result => result.category === categoryName)) {
        return (
          <React.Fragment key={index}>
            <h5 className="primary-nav-category">{categoryName}</h5>
            <ul className="sidebar-list">
              {this.renderCategoryItems(
                categoryItems.filter(item =>
                  item.name.toLowerCase().includes(currentSearchQuery)
                ),
                currentPage
              )}
            </ul>
          </React.Fragment>
        );
      }

      return undefined;
    });

    // if the search returned results, return them. If not return a
    // an explanation of why nothing is showing up
    if (menuOutput.some(item => item !== undefined)) {
      return menuOutput;
    } else {
      return (
        <div className="no-search-results">
          <h5>No components or utilites found that match:</h5>
          <strong>"{currentSearchQuery}"</strong>
        </div>
      );
    }
  }

  renderCategoryItems(items, currentPage) {
    return items.map((item, index) => {
      return (
        <li
          className={`primary-nav-item ${
            currentPage.name === item.name ? 'active' : ''
          }`}
          key={index}
          onClick={() => this.handleListItemClick(item)}
        >
          {item.name}
        </li>
      );
    });
  }

  searchDocs(e) {
    this.setState({
      currentSearchQuery: e.target.value.toLowerCase()
    });
  }

  render() {
    const { currentPage, currentSearchQuery } = this.state;

    const componentName = currentPage ? currentPage.name : '';
    const Page =
      currentPage && PAGES[componentName] ? PAGES[componentName] : false;

    return (
      <>
        <Grid
          className="primary-grid"
          spacingType={[Grid.SPACING_TYPE.NONE, Grid.SPACING_TYPE.NONE]}
        >
          <GridItem columnSpan={3}>
            <Stack
              fullWidth
              fullHeight
              directionType={Stack.DIRECTION_TYPE.VERTICAL}
              className="sidebar-container"
            >
              <StackItem className="search-container">
                <TextField
                  placeholder="Search the docs..."
                  onChange={this.searchDocs}
                />
              </StackItem>
              <StackItem grow className="primary-nav-container">
                {currentSearchQuery === ''
                  ? this.renderByCategories(currentPage)
                  : this.renderSearchResults(currentPage)}
              </StackItem>
              <StackItem className="footer-info-container">
                <Stack fullWidth fullHeight className="footer-info">
                  <StackItem grow>
                    <small>Notice a bug or have an idea?</small>
                  </StackItem>
                  <StackItem>
                    <Button
                      sizeType={Button.SIZE_TYPE.SMALL}
                      type={Button.TYPE.PRIMARY}
                      style={{ backgroundImage: `url(${GitHubIcon})` }}
                      to="https://github.com/newrelic/nr1-community/issues/new/choose"
                      className="github-button"
                    >
                      Submit an Issue
                    </Button>
                  </StackItem>
                </Stack>
              </StackItem>
            </Stack>
          </GridItem>
          <GridItem className="primary-content-container" columnSpan={9}>
            <main className="primary-content full-height">
              {currentPage && Page && <Page />}
              {!currentPage && <h1>Choose a Component</h1>}
            </main>
          </GridItem>
        </Grid>
      </>
    );
  }
}
