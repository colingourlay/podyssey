import './custom-great-southern-sky.css';

const CUSTOM_CONTENT = {
  endcontent: `
<style>
  .PodysseyEndCard {
    margin: auto;
    max-width: 24rem;
    color: inherit;
    font-family: ABCSans;
    font-size: 1rem;
    text-align: center;
  }
  .PodysseyEndCard > :last-child {
    margin-bottom: 0;
  }
  .PodysseyEndCard p {
    margin: 0 auto;
    max-width: 95%;
    line-height: 1.4;
  }
  .PodysseyEndCard a {
    display: block;
    margin-top: .375rem;
    margin-bottom: 1.75rem;
    padding: 0.75rem 1.25rem;
    background-color: #2F3654;
    color: white;
    font-size: 0.875rem;
    font-weight: bold;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.125rem;
  }
  .PodysseyEndCard img {
    display: inline;
    margin: 0.25rem 0;
    width: auto;
    vertical-align: bottom;
  }
  .PodysseyEndCard div {
    display: flex;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
  }
  .PodysseyEndCard div > * {
    flex-grow: 1;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
  @media (max-width: 360px) {
    .PodysseyEndCard {
     font-size: 0.875rem;
    }
    .PodysseyEndCard p {
      margin: 0;
      line-height: 1.2;
    }
    .PodysseyEndCard a {
      margin-bottom: 0.375rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }
    .PodysseyEndCard div {
      margin-right: -0.25rem;
      margin-left: -0.25rem;
    }
    .PodysseyEndCard div > * {
      margin-right: 0.25rem;
      margin-left: 0.25rem;
    }
  }
  </style>
  <div class="PodysseyEndCard">
    <p>Explore the cosmos and help us set a world record on</p>
    <a target="_blank" href="//abc.net.au/stargazing" style="background-color:#00454D">
      <img alt="Stargazing Live" style="height:25px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAABLCAYAAAAvUwK+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTJEQzdENzk1MUVEMTFFODkxNzZCOUI5RDc2NTI5MUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTJEQzdEN0E1MUVEMTFFODkxNzZCOUI5RDc2NTI5MUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMkRDN0Q3NzUxRUQxMUU4OTE3NkI5QjlENzY1MjkxQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMkRDN0Q3ODUxRUQxMUU4OTE3NkI5QjlENzY1MjkxQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsFout0AACOtSURBVHja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" />
    </a>
    <p>Expand your knowledge with ABC Science</p>
    <div>
      <a target="_blank" href="/news/8373718">Learn how the night sky works</a>
      <a target="_blank" href="/news/9320770">Beginner's guide to the moon</a>
    </div>
    <p>See more stunning astrophotography and submit your images to</p>
    <a target="_blank" href="//open.abc.net.au/explore?projectId=152" style="background-color:#C74816">
      <img alt="ABC Open" style="height:29px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVAAAABXCAYAAABSmh3VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTJEQzdEN0Q1MUVEMTFFODkxNzZCOUI5RDc2NTI5MUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTJEQzdEN0U1MUVEMTFFODkxNzZCOUI5RDc2NTI5MUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMkRDN0Q3QjUxRUQxMUU4OTE3NkI5QjlENzY1MjkxQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMkRDN0Q3QzUxRUQxMUU4OTE3NkI5QjlENzY1MjkxQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjXrqOUAABeLSURBVHja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" />
    </a>
  </div>
  `
};

window.addEventListener('podyssey:custom', ({ detail }) => {
  const { id, el } = detail;

  const html = CUSTOM_CONTENT[id];

  if (html) {
    el.innerHTML = html;
  }
});
