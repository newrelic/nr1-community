import React from 'react';
import { Grid, GridItem, Stack, StackItem, TextField, Button } from 'nr1';
import * as PAGES from './pages';

// TO DO - glob from /components and /utilities
const componentList = [
  { name: 'AccountDropdown', category: 'Components' },
  { name: 'EventStream', category: 'Components' },
  { name: 'Funnel', category: 'Components' },
  { name: 'timeRangeToNrql', category: 'Utilities' }
];

export default class NerdpackLayoutStandard extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleListItemClick(page) {
    this.setState({ currentPage: page });
  }

  renderByCategories() {
    const { categoryMap } = this.state;
    const categories = Object.keys(categoryMap);

    return categories.map((value, index) => {
      const categoryName = value;
      const categoryItems = categoryMap[value];
      return (
        <React.Fragment key={index}>
          <h2>{categoryName}</h2>
          <ul className="sidebar-list">
            {this.renderCategoryItems(categoryItems)}
          </ul>
        </React.Fragment>
      );
    });
  }

  renderCategoryItems(items) {
    return items.map((item, index) => {
      return (
        <li
          className="sidebar-list-item"
          key={index}
          onClick={() => this.handleListItemClick(item)}
        >
          {item.name}
        </li>
      );
    });
  }

  render() {
    const { currentPage } = this.state;

    const componentName = currentPage ? currentPage.name : '';
    const Page =
      currentPage && PAGES[componentName] ? PAGES[componentName] : false;

    return (
      <>
        <Grid
          className="primary-grid"
          spacingType={[Grid.SPACING_TYPE.NONE, Grid.SPACING_TYPE.NONE]}
        >
          <GridItem className="sidebar-container" columnSpan={3}>
            {this.renderByCategories()}
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
