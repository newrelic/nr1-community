import React from 'react';
import { Grid, GridItem, Stack, StackItem, TextField, Button } from 'nr1';
import * as PAGES from './pages';

const componentList = [
  { name: 'AccountDropdown', category: 'Components' },
  { name: 'EventStream', category: 'Components' },
  { name: 'timeRangeToNrql', category: 'Utilities' }
];

export default class NerdpackLayoutStandard extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      categoryMap: componentList.reduce((previousValue, currentValue) => {
        const category = currentValue.category;

        if (!previousValue[category]) {
          previousValue[category] = [];
        }

        previousValue[category].push(currentValue);

        return previousValue;
      }, {}),
      // eslint-disable-next-line react/no-unused-state
      pageMap: componentList.reduce((previousValue, currentValue) => {
        const { name } = currentValue;

        if (!previousValue[name]) {
          previousValue[name] = [];
        }

        previousValue[name].push(currentValue);
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
        <Stack
          className="toolbar-container"
          fullWidth
          gapType={Stack.GAP_TYPE.NONE}
          horizontalType={Stack.HORIZONTAL_TYPE.FILL_EVENLY}
          verticalType={Stack.VERTICAL_TYPE.FILL}
        >
          <StackItem className="toolbar-section1">
            <Stack
              gapType={Stack.GAP_TYPE.NONE}
              fullWidth
              verticalType={Stack.VERTICAL_TYPE.FILL}
            >
              <StackItem className="toolbar-item">
                <TextField label="Search" placeholder="e.g. example query" />
              </StackItem>
            </Stack>
          </StackItem>
          <StackItem className="toolbar-section2">
            <Stack
              fullWidth
              fullHeight
              verticalType={Stack.VERTICAL_TYPE.CENTER}
              horizontalType={Stack.HORIZONTAL_TYPE.RIGHT}
            >
              <StackItem>
                <Button type={Button.TYPE.PRIMARY}>Primary button</Button>
              </StackItem>
            </Stack>
          </StackItem>
        </Stack>
        <Grid
          className="primary-grid"
          spacingType={[Grid.SPACING_TYPE.NONE, Grid.SPACING_TYPE.NONE]}
        >
          <GridItem className="sidebar-container" columnSpan={3}>
            {this.renderByCategories()}
          </GridItem>
          <GridItem className="primary-content-container" columnSpan={9}>
            <main className="primary-content full-height">
              <Stack
                fullWidth
                fullHeight
                verticalType={Stack.VERTICAL_TYPE.CENTER}
                horizontalType={Stack.HORIZONTAL_TYPE.CENTER}
                directionType={Stack.DIRECTION_TYPE.VERTICAL}
                gapType={Stack.GAP_TYPE.NONE}
              >
                <StackItem>
                  {currentPage && Page && <Page />}
                  {!currentPage && <h1>Choose a Component</h1>}
                </StackItem>
              </Stack>
            </main>
          </GridItem>
        </Grid>
      </>
    );
  }
}
