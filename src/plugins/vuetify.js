import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const isDark = window.matchMedia('(prefers-color-scheme: dark)');
isDark.addListener( (e) => {
    vuetify.framework.theme.dark = e.matches
})

const vuetify = new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: "#eb4034",
                secondary: '#575757',
                accent: '#ffffff'
            },
            dark: {
                primary: "#eb4034",
                secondary: '#575757',
                accent: '#303030'

            }
        }
    }
});
export default vuetify;
