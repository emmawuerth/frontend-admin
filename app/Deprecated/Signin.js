import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MassEnergizeForm from '../containers/MassEnergizeSuperAdmin/_FormGenerator';
import { apiCall } from '../utils/messenger';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing.unit * 4,
    textAlign: 'center'
  },
});


class SigninPageEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formJson: null,
      pageData: null,
    };
  }


  async componentDidMount() {
    const { id } = this.props.match.params;

    const pageData = await apiCall('/signin_page_settings.info', { community_id: id });
    if (pageData && pageData.success) {
      await this.setStateAsync({ pageData: pageData.data });
    }

    const formJson = await this.createFormJson(pageData.data);
    await this.setStateAsync({ formJson });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  createFormJson = async () => {
    const { pageData } = this.state;
    const { community } = pageData;

    const formJson = {
      title: `Edit ${community ? community.name + '\'s' : 'Community\'s'} - Sign-in Page`,
      subTitle: '',
      method: '/signin_page_settings.update',
      // successRedirectPage: `/admin/edit/${community.id}/about_us`,
      fields: [
        {
          name: 'id',
          label: 'ID',
          placeholder: 'eg. 1',
          fieldType: 'TextField',
          contentType: 'number',
          defaultValue: `${pageData.id}`,
          dbName: 'id',
          readOnly: true
        },
        {
          name: 'title',
          label: 'Main Title',
          placeholder: 'eg. All Service Providers',
          fieldType: 'TextField',
          contentType: 'text',
          isRequired: false,
          defaultValue: `${pageData.title}`,
          dbName: 'title',
          readOnly: false
        },
        {
          name: 'description',
          label: 'Additional information',
          placeholder: 'Tell us more ...',
          fieldType: 'TextField',
          contentType: 'text',
          isRequired: false,
          isMultiline: true,
          defaultValue: `${pageData.description}`,
          dbName: 'description',
          readOnly: false
        },
      ]
    };
    return formJson;
  }


  render() {
    const { classes } = this.props;
    const { formJson } = this.state;
    if (!formJson) return (<div>Hold tight! Retrieving your data ...</div>);
    return (
      <div>
        <MassEnergizeForm
          classes={classes}
          formJson={formJson}
        />
      </div>
    );
  }
}

SigninPageEditForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles, { withTheme: true })(SigninPageEditForm);
