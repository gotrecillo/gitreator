import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import scrollTo from 'scroll-to';

class ScrollTop extends Component {
  static propTypes = {
    ease: PropTypes.string,
    style: PropTypes.object,
    duration: PropTypes.number,
    show: PropTypes.number,
    top: PropTypes.number
  };

  static defaultProps = {
    style: {
      position: 'fixed',
      bottom: 50,
      right: 30,
      cursor: 'pointer',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'linear',
      transitionDelay: '0s'
    },
    duration: 500,
    ease: 'out-circ',
    show: 300,
    top: 0
  };

  constructor(props) {
    super(props);

    this.listener = this._scrollHandler.bind(this);

    this.state = {
      active: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listener);
  }

  _scrollHandler() {
    const { show } = this.props;
    if (window.scrollY >= show) {
      this.setState({ active: true });
      return;
    }
    this.setState({ active: false });
  }

  scroll = () => {
    const { ease, duration, top } = this.props;

    scrollTo(0, top, { ease, duration });
  };

  render() {
    const style = this.state.active ? this.props.style : { display: 'none' };
    return (
      <div style={style}>
        <Button variant="fab" color="primary" onClick={this.scroll}>
          <ArrowUpward />
        </Button>
      </div>
    );
  }
}

export default ScrollTop;
