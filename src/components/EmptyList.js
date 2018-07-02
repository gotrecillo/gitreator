import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  organizations: {
    padding: '1.5em'
  }
});

class EmptyList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    objects: PropTypes.string.isRequired
  };

  render() {
    const { objects, classes } = this.props;

    return (
      <Card className={classNames(classes.card)}>
        <CardContent>
          <Typography variant="headline">
            This user does not have any {objects}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(EmptyList);
