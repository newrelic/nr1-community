import React from 'react';

import { Button, Grid, GridItem, Stack, StackItem, TextField } from 'nr1';
import { UserSecretsQuery, UserSecretsMutation } from '@/../dist';
import CodeHighlight from '../../../shared/components/CodeHighlight';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableLiveEditing: false,
      userSecretName: '',
      userSecretValue: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChangeSecret = this.onChangeSecret.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeSecret(event) {
    this.setState({ userSecretName: event.target.value });
  }

  onChangeValue(event) {
    this.setState({ userSecretValue: event.target.value });
  }

  async onSave() {
    const { userSecretName, userSecretValue } = this.state;

    await UserSecretsMutation.mutate({
      actionType: UserSecretsMutation.ACTION_TYPE.WRITE_SECRET,
      name: userSecretName,
      value: userSecretValue
    });
  }

  async onDelete(name) {
    const { data, loading, error } = await UserSecretsMutation.mutate({
      actionType: UserSecretsMutation.ACTION_TYPE.DELETE_SECRET,
      name
    });
  }

  renderHighlight() {
    const { enableLiveEditing } = this.state;
    const scope = {
      Button,
      Grid,
      GridItem,
      TextField,
      UserSecretsQuery,
      UserSecretsMutation,
      onSave: this.onSave,
      onChangeSecret: this.onChangeSecret,
      onChangeValue: this.onChangeValue
    };

    const code = `
<Grid>
  <GridItem columnSpan={6}>
    <TextField
      label="User Secret Name"
      placeholder="foo-password"
      onChange={onChangeSecret}
    />
  </GridItem>
  <GridItem columnSpan={6}>
    <TextField
      label="User Secret value"
      placeholder="foo-password"
      onChange={onChangeValue}
    />
  </GridItem>
  <GridItem columnSpan={12}>
    <Button
      onClick={onSave}
      type={Button.TYPE.PRIMARY}
    >
      Save
    </Button>
  </GridItem>
</Grid>
    `;

    return (
      <CodeHighlight
        scope={scope}
        code={code}
        language="jsx"
        use="react-live"
        enableLiveEditing={enableLiveEditing}
      />
    );
  }

  render() {
    return (
      <div className="example-container">
        <div className="example-container-content">
          {/* {this.renderHighlight()} */}
          <Grid>
            <GridItem columnSpan={12}>
              <Stack>
                <UserSecretsQuery>
                  {({ data, loading, error }) => {
                    if (loading) {
                      return null;
                    }

                    return data.map((s, index) => {
                      return (
                        <StackItem key={index}>
                          <pre>{JSON.stringify(s, null, 2)}</pre>
                          <Button
                            onClick={() => this.onDelete(s.key)}
                            type={Button.TYPE.PRIMARY}
                          >
                            Delete
                          </Button>
                        </StackItem>
                      );
                    });
                  }}
                </UserSecretsQuery>
              </Stack>
            </GridItem>
            <GridItem columnSpan={6}>
              <TextField
                label="User Secret Name"
                placeholder="foo-password"
                onChange={this.onChangeSecret}
              />
            </GridItem>
            <GridItem columnSpan={6}>
              <TextField
                label="User Secret value"
                placeholder="foo-password"
                onChange={this.onChangeValue}
              />
            </GridItem>
            <GridItem columnSpan={12}>
              <Button onClick={this.onSave} type={Button.TYPE.PRIMARY}>
                Save
              </Button>
            </GridItem>
          </Grid>
        </div>
      </div>
    );
  }
}
