const cn = require('classnames');
const { h, Component } = require('preact');
const { detach, select } = require('../../dom');
const Button = require('../Button');
const Entry = require('../Entry');
const Time = require('../Time');
const Timeline = require('../Timeline');
const styles = require('./styles.css');

const STORAGE_PREFIX = 'podyssey';
const HOP_BACK_SECONDS = 15;
const HOP_FORWARD_SECONDS = 30;
const INERT_EL = { focus: () => {} };

class Player extends Component {
  constructor(props) {
    super(props);

    this.getAudioElRef = this.getAudioElRef.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.hopTo = this.hopTo.bind(this);
    this.hopToDataTime = this.hopToDataTime.bind(this);

    // this._lastStoredTime = +localStorage.getItem(`${STORAGE_PREFIX}__currentTime__${this.props.audioCMID}`);

    this.state = {
      // currentTime: this._lastStoredTime,
      currentTime: 0,
      duration: 0,
      isPaused: true,
      isEnded: false
    };
  }

  getAudioElRef(el) {
    this.audioEl = el;
  }

  pause() {
    this.audioEl.pause();
  }

  play() {
    if (this.state.isEnded) {
      this.audioEl.currentTime = 0;
    }

    this.audioEl.play();
  }

  hopTo(time) {
    this.audioEl.currentTime = time;
  }

  hopToDataTime(event) {
    this.hopTo(event.currentTarget.getAttribute('data-time'));
  }

  componentDidUpdate() {
    // Persist playback time if changed by 5 seconds
    // if (Math.abs(this._lastStoredTime - this.state.currentTime) > 5) {
    //   this._lastStoredTime = Math.round(this.state.currentTime);
    //   localStorage.setItem(`${STORAGE_PREFIX}__currentTime__${this.props.audioCMID}`, this._lastStoredTime);
    // }
  }

  componentDidMount() {
    this.audioEl.addEventListener('durationchange', () => this.setState({ duration: this.audioEl.duration }));
    this.audioEl.addEventListener('waiting', () => console.log('xxxx'), this.setState({ isBuffering: true }));
    this.audioEl.addEventListener('ended', () => this.setState({ isEnded: true }));
    this.audioEl.addEventListener('pause', () => this.setState({ isPaused: true }));
    this.audioEl.addEventListener('playing', () =>
      this.setState({ isBuffering: false, isEnded: false, isPaused: false })
    );
    this.audioEl.addEventListener(
      'timeupdate',
      () => this._isSeeking || this.setState({ currentTime: this.audioEl ? this.audioEl.currentTime : 0 })
    );
    // this.hopTo(this._lastStoredTime);

    // FLIP playback icon

    const playbackIconEl = select('svg[data-type="play"], svg[data-type="pause"]', this.base);
    const playbackIconRect = playbackIconEl.getBoundingClientRect();

    if (this.props.transitionData) {
      const transform = {
        translateY:
          this.props.transitionData.playIconRect.top -
          playbackIconRect.top +
          (this.props.transitionData.playIconRect.height - playbackIconRect.height) / 2,
        scale: this.props.transitionData.playIconRect.width / playbackIconRect.width
      };

      playbackIconEl.style.transitionDelay = '0s';
      playbackIconEl.style.transitionDuration = '0s';
      playbackIconEl.style.transform = `translate(0, ${transform.translateY}px) scale(${transform.scale})`;

      setTimeout(() => {
        playbackIconEl.style.transitionDelay = '';
        playbackIconEl.style.transitionDuration = '';
        playbackIconEl.style.transform = '';
      });
    }

    // Auto-play
    this.play();
  }

  componentWillUnmount() {
    this.audioEl.pause();
    detach(this.audioEl);
  }

  render({ audioData, entries, sections, title }, { currentTime, duration, isBuffering, isEnded, isPaused }) {
    const titledSectionTimes = sections.filter(section => section.title).map(section => section.time);
    const activeTitledSectionTime = titledSectionTimes
      .slice()
      .reverse()
      .find(time => time < currentTime);
    const prevTitledSectionTime =
      titledSectionTimes.length > 1 && titledSectionTimes[titledSectionTimes.indexOf(activeTitledSectionTime) - 1];
    const nextTitledSectionTime =
      titledSectionTimes.length > 1 && titledSectionTimes[titledSectionTimes.indexOf(activeTitledSectionTime) + 1];
    const entryTimes = Object.keys(entries);
    const activeEntryTime = entryTimes.reverse().find(time => time < currentTime);
    const activeEntry = activeEntryTime === null ? null : entries[activeEntryTime];

    return (
      <div className={cn(styles.root, { [styles.buffering]: isBuffering })}>
        <audio ref={this.getAudioElRef} preload>
          <source src={audioData.url} type={audioData.contentType} />}
        </audio>
        <main className={styles.main}>
          {activeEntry && (
            <Entry
              key={activeEntry}
              media={activeEntry.media}
              notes={activeEntry.notes}
              section={sections[activeEntry.sectionIndex]}
            />
          )}
        </main>
        <nav ref={this.getControlsElRef} className={styles.controls}>
          <Timeline currentTime={currentTime} duration={duration} snapTimes={titledSectionTimes} update={this.hopTo} />
          <div className={styles.times}>
            <Time numSeconds={Math.round(currentTime)} />
            <Time numSeconds={Math.round(duration)} />
          </div>
          <div className={styles.buttons}>
            <HopButton type="prev" time={prevTitledSectionTime} onClick={this.hopToDataTime} />
            <Button type={isPaused ? 'play' : 'pause'} onClick={this[isPaused ? 'play' : 'pause']} />
            <HopButton type="next" time={nextTitledSectionTime} onClick={this.hopToDataTime} />
          </div>
        </nav>
        <nav className={styles.regions}>
          <HopButton type="prev" time={prevTitledSectionTime} onClick={this.hopToDataTime} tabindex="0" />
          <HopButton type="next" time={nextTitledSectionTime} onClick={this.hopToDataTime} tabindex="0" />
        </nav>
      </div>
    );
  }
}

const HopButton = ({ type, time, onClick, ...props }) => (
  <Button
    type={type}
    disabled={typeof time !== 'number'}
    onClick={onClick}
    data-time={typeof time !== 'number' ? null : time + 0.01}
    {...props}
  />
);

module.exports = Player;
