import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Type from 'dan-styles/Typography.scss';
import Fab from '@material-ui/core/Fab';
import {
  Checkbox,
  Select,
  TextField,
  Switch
} from 'redux-form-material-ui';
import { initAction, clearAction } from '../../../actions/ReduxFormActions';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);
const uploadBox = {
  border: 'solid 1px #e0e0e0',
  borderRadius: 5,
  padding: 25
}
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

const initData = {
  text: 'Sample Text',
  email: 'sample@mail.com',
  radio: 'option1',
  selection: 'option1',
  onof: true,
  checkbox: true,
  textarea: 'This is default text'
};

class CreateNewTestimonialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }
  showFileList() {
    const { files } = this.state;
    if (files.length === 0) return "You have not selected any image ";
    var string = "";
    for (var i = 0; i < files.length; i++) {
      if (string !== "") {
        string += ", " + files[i].name;
      }
      else {
        string = files[i].name;
      }
    }
    return string;
  }

  handleTexts = (event)=>{
    this.setState({ [event.target.name]:event.target.value});
  }
  render() {
    const trueBool = true;
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
      init,
      clear
    } = this.props;
    return (
      <div>
        <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={10} sm={12} xs={12}>
            <Paper className={classes.root}>
              <h4 style={{color:'#585858',fontWeight:"500"}}>Use this form to create a testimonial</h4>
              <TextField
              name = "title"
                onChange={(event) => { this.handleTexts(event) }}
                fullWidth
                placeholder="Title"
                margin="normal"
                variant="outlined"
                helperText="Add the title of this story"
              />
              <TextField
              name = "description"
                onChange={(event) => {this.handleTexts(event) }}
                id="outlined-multiline-flexible"
                label="Description"
                fullWidth
                multiline
                cols="20"
                rowsMax="19"
                rows="10"
                placeholder="Write a testimonial..."
                className={classes.textField}
                margin="normal"
                helperText="Describe what happened..."
                variant="outlined"
              />
              <div style={uploadBox}>
                <Typography className={Type.textGrey} gutterBottom>
                  Upload an image
              </Typography>
                <Typography className={Type.textGreyLight} gutterBottom>
                  {this.showFileList()}
              </Typography>
                <input
                  onChange={info => { this.setState({ files: info.target.files }) }}
                  style={{ display: 'none' }}
                  accept="image/*"
                  className={classes.inputUpload}
                  id="raised-button-file"
                  type="file"
                />
                { /* eslint-disable-next-line */}
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    id="raised-button-file"
                    className={classes.button}
                  >
                    Upload
                </Button>
                </label>
              </div>
              <Fab
                justify="right"
                style={{ margin: 6, background: 'green' }}
                onClick={() => { console.log(  {title:"",description:"",...this.state}) }}
                variant="extended"
                color="secondary"
                aria-label="Delete"
                className={classes.button}
              > Add Testimonial </Fab>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}



export default withStyles(styles)(CreateNewTestimonialForm);


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import {
  Checkbox,
  TextField
} from 'redux-form-material-ui';
import { initAction, clearAction } from '../../../actions/ReduxFormActions';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

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

const initData = {
  name: 'Test',
  subdomain: 'testing1',
  owner_name: 'Ellen Tohn',
  owner_email: 'etohn@massenergize.org',
  is_tech_savvy: 'Yes',
  geographical_focus: 'DISPERSED',
  accepted_terms_and_conditions: true,
  about_community: 'I am a resident of Wayland and I lead a group of people who are interested in taking climate actions together as a town.',
};

class CommunityOnboardingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLocation: false,
      accepted_terms_and_conditions: false
    };
  }

  render() {
    const trueBool = true;
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
      init,
      clear,
      submitIsClicked
    } = this.props;
    const {accepted_terms_and_conditions} = this.state 

    return (
      <div>
        <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                Community Onboarding Form
              </Typography>
              <Typography component="p">
                Please complete this form to the best of your knowledge.
              </Typography>
              <div className={classes.buttonInit}>
                <Button onClick={() => init(initData)} color="secondary" type="button">
                  Load Sample Data
                </Button>
                <Button onClick={() => clear()} type="button">
                  Clear Data
                </Button>
              </div>
              <form onSubmit={handleSubmit}>

                <div>
                  <Field
                    name="name"
                    component={TextField}
                    placeholder="Community Name eg. Wayland"
                    label="Community Name"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="subdomain"
                    component={TextField}
                    placeholder="eg. You will need your subdomain to access your community portal through subdomain.massenergize.org"
                    label="Subdomain For your Community Portal"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </div>
                <h1>About the Community Admin</h1>
                <div>
                  <Field
                    name="owner_name"
                    component={TextField}
                    placeholder="Community Admin Name eg. Ellen Tohn"
                    label="Community Administrator's Name"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="owner_email"
                    component={TextField}
                    placeholder="eg. admin@wayland.com"
                    label="Community Administrator's Email"
                    required
                    validate={[required, email]}
                    className={classes.field}
                  />
                </div>
                <div className={classes.field}>
                  <Field
                    name="about_community"
                    className={classes.field}
                    component={TextField}
                    placeholder="Tell us about you"
                    label="Tell Us About You"
                    multiline={trueBool}
                    rows={4}
                  />
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Are you Tech Savvy?</FormLabel>
                  <Field name="is_tech_savvy" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </Field>
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Geographic Focus</FormLabel>
                  <Field name="geographical_focus" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="DISPERSED" control={<Radio />} label="Geographically Dispersed" onClick={() => { this.setState({ ...this.state, showLocation: false }); }} />
                    <FormControlLabel value="FOCUSED" control={<Radio />} label="Geographically Focused" onClick={() => { this.setState({ ...this.state, showLocation: true }); }} />
                  </Field>
                </div>
                {this.state.showLocation
                  && (

                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <Field
                          name="address1"
                          component={TextField}
                          placeholder="eg. 9 Fields Lane"
                          label="Address Line 1"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="address2"
                          component={TextField}
                          placeholder="eg. Apt 4"
                          label="Address Line 2"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="city"
                          component={TextField}
                          placeholder="eg. Wayland"
                          label="City"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="state"
                          component={TextField}
                          placeholder="eg. New York"
                          label="State"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="zip"
                          component={TextField}
                          placeholder="eg. 10120"
                          label="Zip / Postal Code"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="country"
                          component={TextField}
                          placeholder="eg. Ghana"
                          label="Country"
                          className={classes.field}
                        />
                      </Grid>
                    </Grid>
                  )
                }
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Terms and Conditions</FormLabel>
                  <Field name="accepted_terms_and_conditions" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="True" control={<Radio />} label="Accept" onClick={() => { this.setState({ ...this.state, accepted_terms_and_conditions: !accepted_terms_and_conditions }); }} />
                  </Field>
                </div>
                <div>
                  {submitIsClicked
                    && (
                      <div>
                        <h5>Creating a new Community now ...</h5>
                        <InputLabel>This might take a minute ...</InputLabel>
                        <CircularProgress className={classes.progress} />
                      </div>
                    )
                  }

                  {accepted_terms_and_conditions && 
                  (
                    <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                      Submit
                    </Button>
                  )
                  }
             
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

CommunityOnboardingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(CommunityOnboardingForm);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues']),
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);



import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Type from 'dan-styles/Typography.scss';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import {
  Select,
  TextField,
  Switch
} from 'redux-form-material-ui';
import { fetchData, sendJson } from '../../../utils/messenger';
import { initAction, clearAction } from '../../../actions/ReduxFormActions';



const uploadBox = {
  border: 'solid 1px #e0e0e0',
  borderRadius: 5,
  padding: 25
}
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

const SCOPE = [
  "State wide",
  "City"
]
const DEFAULTS = {
  company_name:"",
  address:"",
  name:"",
  email:"",
  phone:"",
  county:"", 
  town:"",
  services:"",
  onboarding_name:"",
  onboarding_date:""
}
class AddVendorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      national: false,
      residential: false,
      commercial: false,
      verified: false,
      community: { id: null, name: "Choose Community" },
      communities: [],
      scope:""


    }
  }

  componentDidMount() {
    const me = this;
    fetchData('v2/communities').then(res => {
      me.setState({ communities: res.data });
    });
  }
  showFileList() {
    const { files } = this.state;
    if (files.length === 0) return "You have not selected any image ";
    var string = "";
    for (var i = 0; i < files.length; i++) {
      if (string !== "") {
        string += ", " + files[i].name;
      }
      else {
        string = files[i].name;
      }
    }
    return string;
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  handleCommunitiesChoice = (event) => {
    var obj = this.findCommunityObj(event.target.value);
    this.setState({
      community: obj
    })
  }

  handleTexts = (event)=>{
    this.setState({[event.target.name]:event.target.value});
  }
  findCommunityObj = (name) => {
    var section = this.state.communities;
    for (var i = 0; i < section.length; i++) {
      if (section[i].name === name) {
        return section[i];
      }
    }
    return null;
  }

  ejectButton = (classes) => {
    if (this.state.verified) {
      return (
        <Fab
          justify="right"
          style={{ margin: 6, background: 'green' }}
          onClick={() => { this.addVendor() }}
          variant="extended"
          color="secondary"
          aria-label="Delete"
          className={classes.button}
        > Add Vendor </Fab>
      )
    }
  }

  addVendor = ()=>{
   const data =  this.state;
  
   const final = {...DEFAULTS, ...data};
  
  }
  render() {

    const { classes } = this.props;
    const {scope,verified, national, communities, residential, commercial } = this.state;
    const community = this.state.community.name;

    return (
      <div>
        <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={10} sm={12} xs={12}>
            <Paper className={classes.root}>
              <h4 style={{ color: '#585858', fontWeight: "500" }}>Use this form to add new vendor</h4>
              <TextField
                name="company_name"
                onChange={(event) => { this.handleTexts(event) }}
                fullWidth
                placeholder="Company Name"
                margin="normal"
                variant="outlined"

              />
              <TextField
                name="address"
                onChange={(event) => { this.handleTexts(event) }}
                fullWidth
                placeholder="Address"
                margin="normal"
                variant="outlined"

              />
              <div style={{ border: '1px solid rgb(229, 238, 245)', padding: 15, borderRadius: 6 }}>
                <p>KEY CONTACT</p>

                <TextField
                  name="name"
                  onChange={(event) => { this.handleTexts(event) }}
                  fullWidth
                  placeholder="Name"
                  margin="normal"
                  variant="outlined"

                />
                <TextField
                  name="email"
                  onChange={(event) => { this.handleTexts(event) }}
                  fullWidth
                  placeholder="Email"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  name="phone"
                  onChange={(event) => { this.handleTexts(event) }}
                  fullWidth
                  type="number"
                  placeholder="Phone"
                  margin="normal"
                  variant="outlined"

                />
              </div>
              <div style={{ border: '1px solid rgb(229, 238, 245)', padding: 15, borderRadius: 6, margin: "8px 0px" }}>
                <p>SERVICE AREA</p>
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={national}
                        onChange={this.handleChange('national')}
                        value="national"
                      />
                    )}
                    label="National"
                  />
                  <TextField
                    name="county"
                    onChange={(event) => { this.handleTexts(event) }}
                    fullWidth
                    placeholder="County"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    name="town"
                    onChange={(event) => { this.handleTexts(event) }}
                    fullWidth
                    placeholder="Town Name or Zip Code "
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Choose scope"
                    className={classes.textField}
                    value={scope}
                    fullWidth
                    onChange={option => { this.setState({scope:option.target.value})}}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Please select scope"
                    margin="normal"
                    variant="outlined"
                  >
                    {SCOPE.map(option => (
                      <MenuItem key={option.toString()} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <TextField
                name="services"
                onChange={(event) => { this.handleTexts(event) }}
                fullWidth
                placeholder="List Services"
                margin="normal"
                variant="outlined"
              />

              <div style={{ border: '1px solid rgb(229, 238, 245)', padding: 15, borderRadius: 6, margin: "8px 0px" }}>
                <p>PROPERTY SERVICE</p>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={residential}
                      onChange={this.handleChange('residential')}
                      value="residential"
                    />
                  )}
                  label="Residential"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={commercial}
                      onChange={this.handleChange('commercial')}
                      value="commercial"
                    />
                  )}
                  label="Commercial"
                />

              </div>
              <div style={{ border: '1px solid rgb(229, 238, 245)', padding: 15, borderRadius: 6, margin: "8px 0px" }}>
                <p>ONBOARDING CONTACT</p>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Community"
                  className={classes.textField}
                  value={community}
                  fullWidth
                  onChange={option => { this.handleCommunitiesChoice(option) }}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select the community"
                  margin="normal"
                  variant="outlined"
                >
                  {communities.map(option => (
                    <MenuItem key={option.id.toString()} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  name="onboarding_name"
                  onChange={(event) => { this.handleTexts(event) }}
                  fullWidth
                  placeholder="Name"
                  margin="normal"
                  variant="outlined"

                />
                <TextField
                  name="onboarding_date"
                  onChange={(event) => { this.handleTexts(event) }}
                  fullWidth
                  type="date"
                  placeholder="Name"
                  margin="normal"
                  variant="outlined"

                />

              </div>


              <div style={uploadBox}>
                <Typography className={Type.textGrey} gutterBottom>
                  Upload an image
              </Typography>
                <Typography className={Type.textGreyLight} gutterBottom>
                  {this.showFileList()}
                </Typography>
                <input
                  onChange={info => { this.setState({ files: info.target.files }) }}
                  style={{ display: 'none' }}
                  accept="image/*"
                  className={classes.inputUpload}
                  id="raised-button-file"
                  type="file"
                />
                { /* eslint-disable-next-line */}
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    id="raised-button-file"
                    className={classes.button}
                  >
                    Upload
                </Button>
                </label>
              </div>
              <div style={{ padding: 20, background: '#fff4e4', marginBottom: 6, marginTop: 9, borderRadius: 7 }}>
                <p> <b>1. Community-Vendor MOU is signed</b></p>
                <p> <b>2. We have researched the vendor</b></p>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={verified}
                      onChange={this.handleChange('verified')}
                      value="verified"
                    />
                  )}
                  label="I confirm that I have completed the above steps"
                />
              </div>
              {this.ejectButton(classes)}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}



export default withStyles(styles)(AddVendorForm);


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select2 from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  Checkbox,
  TextField,
  Switch,
  Select
} from 'redux-form-material-ui';
import { fetchData, sendJson } from '../../../utils/messenger';
import { initAction, clearAction } from '../../../actions/ReduxFormActions';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);

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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.formData.admins.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}


const initData = {
  name: 'New Dummy Team 1',
  description: 'No Description yet',
};

class CreateNewTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { admins: [], members: [] },
      people: [],
      communities: []
    };
  }


  async componentDidMount() {
    const people = await fetchData('v2/users');
    const communities = await fetchData('v2/communities');

    if (people) {
      this.setStateAsync({ people: people.data });
    }

    if (communities) {
      this.setStateAsync({ communities: communities.data });
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  handleChangeMultiple = (event) => {
    const { target } = event;
    const { name, options } = target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      formData: { [name]: value }
    });
  };

  handleFormDataChange = (event) => {
    const { target } = event;
    if (!target) return;
    const { name, value } = target;
    const { formData } = this.state;
    this.setState({
      formData: { ...formData, [name]: value }
    });
  }

  submitForm = async (event) => {
    event.preventDefault();
    const { formData } = this.state;
    const cleanedValues = { ...formData };
    const response = sendJson(cleanedValues, '/v2/teams', '/admin/read/teams');
  }

  async updateForm(fieldName, value) {
    const { formData } = this.state;
    await this.setStateAsync({
      formData: {
        ...formData,
        [fieldName]: value
      }
    }
    );
  }

  render() {
    const trueBool = true;
    const {
      classes,
      pristine,
      reset,
      submitting,
      init,
      clear
    } = this.props;
    const {
      formData, people, communities
    } = this.state;
    const { admins, members, community } = formData;
    let communitySelected = communities.filter(c => c.id === community)[0];
    communitySelected = communitySelected ? communitySelected.name : '';

    return (
      <div>
        <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <div style={{ margin: 30 }} />
              <Typography variant="h5" component="h3">
                 New Team
              </Typography>
              <div style={{ margin: 50 }} />
              <form onSubmit={this.submitForm}>
                <div>
                  <Field
                    name="name"
                    component={TextField}
                    placeholder="Team Name"
                    label="Team Name"
                    validate={required}
                    required
                    ref={this.saveRef}
                    className={classes.field}
                    onChange={this.handleFormDataChange}
                  />
                </div>
                <div>
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="community">Community</InputLabel>
                    <Select2
                      native
                      name="community"
                      onChange={async (newValue) => { await this.updateForm('community', parseInt(newValue.target.value, 10)); }}
                      inputProps={{
                        id: 'age-native-simple',
                      }}
                    >
                      <option value={community}>{communitySelected}</option>
                      { communities
                            && communities.map(c => (
                              <option value={c.id} key={c.id}>{c.name}</option>
                            ))
                      }
                    </Select2>
                  </FormControl>
                </div>
                <div>
                  <Field
                    name="team_admin_email"
                    component={TextField}
                    placeholder="Team Admin Email"
                    label="Add Team admin by email"
                    validate={required}
                    required
                    ref={this.saveRef}
                    className={classes.field}
                    onChange={this.handleFormDataChange}
                  />
                </div>
                <div className={classes.field}>
                  <Field
                    name="description"
                    className={classes.field}
                    component={TextField}
                    placeholder="About this Team"
                    label="About this Team"
                    multiline={trueBool}
                    rows={4}
                    onChange={this.handleFormDataChange}
                  />
                </div>
                <div>
                  <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                    Submit
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

CreateNewTeamForm.propTypes = {
  classes: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(CreateNewTeamForm);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles, { withTheme: true })(FormInit);
