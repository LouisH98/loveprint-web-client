import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: "#eb4034",
                secondary: '#575757'
            },
            dark: {
                primary: "#eb4034",
                secondary: '#575757'
            }
        }
    }
});
