import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faTwitter, 
  faFacebookF, 
  faWhatsapp, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faTwitter,
  faFacebookF,
  faWhatsapp,
  faTelegram
)

Vue.component('font-awesome-icon', FontAwesomeIcon) 