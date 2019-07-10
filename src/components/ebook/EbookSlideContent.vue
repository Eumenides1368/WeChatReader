<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          class="slide-contents-search-input"
          type="text"
          :placeholder="$t('book.searchHint')"
          @focus="showSearchPage()"
        >
      </div>
      <div class="slide-contents-search-cancel" v-show="isCancelShow" @click="hideSearchPage()">
        {{$t('book.cancel')}}
      </div>
    </div>
    <div class="slide-book-contents-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{ metadata.title }}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{ metadata.creator }}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <div class="progress">{{ progress + '%' + $t('book.haveRead2') }}</div>
        </div>
        <div class="progress-text">{{ getReadTimeText() }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      isCancelShow: false
    }
  },
  methods: {
    showSearchPage () {
      this.isCancelShow = true
    },
    hideSearchPage () {
      this.isCancelShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook-slide-contents {
  font-size: 0;
  .slide-contents-search-wrapper {
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    display: flex;
    .slide-contents-search-input-wrapper {
      flex: 1;
      display: flex;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(16);
        @include right;
      }
      .slide-contents-search-input {
        flex: 1;
        background: transparent;
        border: none;
        margin-left: px2rem(6);
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(16);
      @include right;
    }
  }
  .slide-book-contents-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    margin: px2rem(10) px2rem(15);
    .slide-contents-book-img-wrapper {
      flex: 0, 0, px2rem(20);
      .slide-contents-book-img {
        width: px2rem(60);
        // margin: px2rem(10) px2rem(20);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 0 0 px2rem(155);
      padding: px2rem(10) px2rem(10);
      // width: px2rem(100);
      .slide-contents-book-title {
        .slide-contents-book-title-text {
          font-size: px2rem(14);
          @include ellipsis2(2);
        }
      }
      .slide-contents-book-author {
        margin-top: px2rem(20);
        .slide-contents-book-author-text {
          font-size: px2rem(14);
        }
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .slide-contents-book-progress {
        // flex: 1;
        .progress {
          font-size: px2rem(14);
        }
      }
      .progress-text {
        margin-top: px2rem(5);
        font-size: px2rem(12);
      }
    }
  }
}
</style>
