<template>
  <footer class="footer">
    <div class="footer__container container">
      <span class="footer__copyright"> &copy; 2021 Shelly </span>
      <ul class="footer__social">
        <li class="footer__social-item">
          <a
            class="footer__social-link"
            href="https://www.linkedin.com/"
            target="_blank"
          >
            <svg class="footer__social-icon" width="19" height="18">
              <use xlink:href="@shoppe/shared/assets/icons/social-icons.svg#linkedin" />
            </svg>
          </a>
        </li>
        <li class="footer__social-item">
          <a
            class="footer__social-link"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <svg class="footer__social-icon" width="10" height="18">
              <use xlink:href="@shoppe/shared/assets/icons/social-icons.svg#facebook" />
            </svg>
          </a>
        </li>
        <li class="footer__social-item">
          <a
            class="footer__social-link"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <svg class="footer__social-icon" width="18" height="18">
              <use xlink:href="@shoppe/shared/assets/icons/social-icons.svg#instagram" />
            </svg>
          </a>
        </li>
        <li class="footer__social-item">
          <a class="footer__social-link" href="https://x.com/" target="_blank">
            <svg class="footer__social-icon" width="20" height="17">
              <use xlink:href="@shoppe/shared/assets/icons/social-icons.svg#twitter" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" src="./AppFooter.scss"></style>
