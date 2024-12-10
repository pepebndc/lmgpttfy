import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faTwitter, 
  faWhatsapp, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons'
import { 
  faSun, 
  faMoon, 
  faDownload, 
  faCopy,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faTwitter,
  faWhatsapp,
  faTelegram,
  faSun,
  faMoon,
  faDownload,
  faCopy,
  faChevronLeft,
  faChevronRight
)

Vue.component('font-awesome-icon', FontAwesomeIcon) 