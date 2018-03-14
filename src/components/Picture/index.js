const { h, Component } = require('preact');
const { MS_VERSION } = require('../../constants');
const styleUtils = require('../../utils.css');
const styles = require('./styles.css');

const DEFAULT_RATIO = '1x1';
const RATIO_SIZES = {
  '16x9': '940x529',
  '3x2': '940x627',
  '4x3': '940x705',
  '1x1': '940x940',
  '3x4': '940x1253'
};
const RATIO_PATTERN = /(\d+x\d+)/;
const P1_RATIO_SIZE_PATTERN = /(\d+x\d+)-(\d+x\d+)/;
const P2_RATIO_SIZE_PATTERN = /(\d+x\d+)-([a-z]+)/;

function resize({ url, ratio }) {
  return url
    .replace(P2_RATIO_SIZE_PATTERN, '$1-large')
    .replace(RATIO_PATTERN, ratio)
    .replace(P1_RATIO_SIZE_PATTERN, `$1-${RATIO_SIZES[ratio]}`);
}

module.exports = ({ url = '', alt = '', ratio = DEFAULT_RATIO }) => {
  const [, originalRatio] = url.match(RATIO_PATTERN) || [, null];

  return (
    <div className={styles.root}>
      <div className={styleUtils[`aspect${ratio}`]} />
      <img src={resize({ url, ratio })} alt={alt} />
    </div>
  );
};

module.exports.inferProps = el => {
  el = el.matches('img') ? el : el.querySelector('img');

  return {
    url: el.src,
    alt: el.alt
  };
};

module.exports.resize = resize;
