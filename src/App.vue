<template>
  <div id="app">
    <h1>{{ name }}</h1>
    <h2>{{ title }}</h2>
    <div class="main grid">
      <div
        class="project"
        :class="{
          isJumbo: project.jumbo,
        }"
        v-for="project in projects"
        :key="project.id"
        @click.prevent.stop="setActiveProject(project)">
        <img class="image" :src="`${imagePath(project.id)}`">
        <p class="title">{{ project.title }}</p>
      </div>
    </div>
    <footer>
      <h2>&copy;2020 {{ name }}</h2>
    </footer>
    <transition name="fade">
      <div
        class="active-project-container fullscreen"
        v-if="activeProject"
        @click="setActiveProject()">
        <div
          class="nav-button prev"
          @click.prevent.stop="nextActiveProject(-1)">
        </div>
        <div class="active-project">
          <div class="video-player">
            <video
              class="video" autoplay playsinline ref="player"
              :poster="currentVideoPoster"
              @click.prevent.stop="togglePlayPause">
              <source :src="currentVideo" type="video/webm">
              Your browser does not support the video tag.
            </video>
          </div>
          <h3>{{ activeProject.title }}</h3>
          <p>{{ activeProject.role }}</p>
        </div>
        <div
          class="nav-button next"
          @click.prevent.stop="nextActiveProject(1)">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      activeProject: null,
      name: 'Frank\nHernandez',
      title: 'Motion graphics & creative ads',
      projects: [
        {
          id: 14,
          title: 'MORTAL KOMBAT 11',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
          jumbo: true,
        },
        {
          id: 15,
          title: 'A BEAUTIFUL DAY IN THE NEIGHBORHOOD',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 16,
          title: 'PLAYSTATION',
          company: 'SONY',
          role: 'Edit + Motion Graphics',
          videos: ['a'],
        },
        {
          id: 17,
          title: 'DOWNTON ABBEY',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 18,
          title: 'SEVEN DEADLY SINS: GRAND CROSS',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 19,
          title: 'FOR LIFE',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a'],
        },
        {
          id: 20,
          title: 'KING OF FIGHTERS: ALL STARS',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 21,
          title: 'MAYANS MC',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 22,
          title: 'KOONGYA DRAW PARTY',
          company: '',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b'],
        },
        {
          id: 1,
          title: 'ASSASSINATION NATION',
          company: 'NEON',
          role: 'Cutdowns + Motion Graphics',
          videos: ['a', 'b', 'c'],
          jumbo: true,
        },
        {
          id: 4,
          title: 'SPIDER-MAN: HOMECOMING',
          company: 'SONY/MARVEL STUDIOS',
          role: 'Cutdowns + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 6,
          title: 'LOST IN SPACE',
          company: '20TH CENTURY FOX',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 7,
          title: 'WON\'T YOU BE MY NEIGHBOR?',
          company: 'FOCUS FEATURES',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 8,
          title: 'DREAMWORKS TROLLS',
          company: 'UNIVERSAL STUDIOS',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b'],
        },
        {
          id: 2,
          title: 'KINGDOM HEARTS 3',
          company: 'SQUARE ENIX',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b', 'c'],
        },
        {
          id: 10,
          title: 'OCTOPATH TRAVELER',
          company: 'SQUARE ENIX',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b'],
        },
        {
          id: 11,
          title: 'X-MEN: TRILOGY',
          company: '20TH CENTURY FOX',
          role: 'Edit + Motion Graphics',
          videos: ['a', 'b'],
          jumbo: true,
        },
        {
          id: 3,
          title: 'RAINBOW SIX: SIEGE',
          company: 'UBISOFT',
          role: 'Edit + Motion Graphics',
          videos: ['a'],
        },
      ]
    }
  },
  computed: {
    currentVideo() {
      return require(`./assets/videos-hd/${this.activeProject.id}a.webm`);
    },
    currentVideoPoster() {
      return require(`./assets/videos-hd/${this.activeProject.id}a.png`);
    },
  },
  methods: {
    imagePath(id) {
      return require(`./assets/images/${id}.jpg`);
    },
    videoPath(id, filename) {
      return require(`./assets/videos-hd/${id}${filename}.webm`);
    },
    nextActiveProject(delta) {
      let nextProjectId = (this.activeProject.id + delta) % 12;
      if (nextProjectId === 0) nextProjectId = 12;
      const nextProject = this.projects.find(project => project.id === nextProjectId);
      this.setActiveProject(nextProject);
      this.$refs.player.src = this.currentVideo;
      this.$refs.player.setAttribute('poster', this.currentVideoPoster);
    },
    setActiveProject(project) {
      this.activeProject = project;
      if (project) {
        this.$ga.event('navigation', 'view-project', project.title, 'project-' + project.id);
      }
    },
    togglePlayPause() {
      if (this.$refs.player.paused) {
        this.$refs.player.play();
      } else {
        this.$refs.player.pause();
      }
    },
  },
  // mounted() {
  //   if (process.env.NODE_ENV === 'development') {
  //     this.setActiveProject(this.projects[0]);
  //   }
  // },
}
</script>

<style lang="scss">
@import url("https://use.typekit.net/pzr3yvx.css");

body, h1, h2, h3, h4, h5, h6, p {
  padding: 0;
  margin: 0;
}
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

#app {
  font-family: mr-eaves-modern, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 960px;
  margin: 4em auto;
}

h1 {
  font-size: 4em;
  white-space: pre-wrap;
  line-height: 1;
  letter-spacing: -0.025em;
  transform: translateX(-0.05em);
  margin-bottom: 1rem;
}

h2 {
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

footer {
  text-align: right;
}

.main {
  margin: 4em 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 20px;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(white, .85);
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: 400ms cubic-bezier(0.86, 0, 0.07, 1) opacity;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.project {
  // width: 300px;
  height: 300px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  // padding: 20px;

  &.isJumbo {
    grid-column-start: span 2;
    .image {
      opacity: 1;
    }
  }

  .image {
    object-fit: cover;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
    transition: 400ms cubic-bezier(0.86, 0, 0.07, 1);
    transition-property: transform, opacity;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    opacity: .8;
  }
  .title {
    // display: none;
    background: white;
    padding: .5em 1em;
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 14px;
    transition: 400ms cubic-bezier(0.86, 0, 0.07, 1);
    transition-property: transform;
    transform: translateY(4em);
  }

  &:hover {
    cursor: pointer;

    .image {
      transform: scale(1.1);
      opacity: 1;
    }
    .title {
      transform: translateY(0);
    }
  }
}

.active-project-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.video-player {
  width: 540px;
  height: 540px;
  margin-bottom: 1rem;
}
.video {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.nav-button {
  width: 4em;
  height: 8em;
  margin-top: -3em;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: '';
    display: block;
    width: 4em;
    height: 4em;
    border: 2px solid;
    border-right: none;
    border-top: none;
    transform: rotate(45deg) translate(25%, -25%);
    transition: 200ms steps(4) border-width;
  }
  &.prev {
    margin-right: 5em;
  }
  &.next {
    margin-left: 5em;
    transform: scale(-1);
  }
  &:hover {
    cursor: pointer;
    // &::before {
    //   border-width: 8px;
    // }
  }
}

@media all and (max-width: 960px) {
  #app {
    padding: 0 20px;
  }
  .grid {
    display: flex;
    width: 100%;
    flex-flow: column nowrap;
  }
  .fullscreen {
    background: rgba(white, .95);
  }
  .project {
    margin-bottom: 20px;
    &.isJumbo {
      order: -1;
    }
    .image {
      opacity: 1;
    }
    .title {
      transform: translateY(0);
    }
  }
  .video-player {
    width: 100vw;
    max-height: calc(100vw - 40px);
    padding: 0 20px;
    margin-bottom: 40px;
  }
  .nav-button {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    font-size: 50%;
    &.prev {
      margin-right: 0;
      left: 20px;
      transform: translateY(50vw);
    }
    &.next {
      margin-left: 0;
      right: 20px;
      transform: translateY(50vw) scale(-1);
    }
  }
}
</style>
