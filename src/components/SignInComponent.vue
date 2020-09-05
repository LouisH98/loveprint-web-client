<template>
  <v-dialog
      persistent
      v-model="showModal"
      max-width="350"
      content-class="rounded-xl"
  >
    <v-card
    >
      <v-card-title class="headline">
        Who are you?
      </v-card-title>
      <v-divider/>
      <v-card-actions class="pt-0">
        <v-form style="width: 100%">
          <v-container>
            <v-col>
              <v-row>
                <v-text-field
                    label="Name"
                    required
                    counter
                    :rules="[rules.counter]"
                    v-model="usernameField"
                    maxlength="10"
                    @keypress.enter="setUsername"
                >

                </v-text-field>
              </v-row>
              <v-row v-if="passwordNeeded">
                <v-text-field
                    required
                    type="password"
                    label="Passphrase"
                />
              </v-row>
              <v-row justify="center">
                <v-btn
                    color="primary"
                    elevation="5"
                    @click="setUsername"
                >
                  Continue
                </v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-form>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SignInComponent",
  mounted() {
    if(this.$store.state.username === ""){
      this.showModal = true
    }
  },
  data: () => ({
    showModal: false,
    formValid: false,
    usernameField: "",
    passwordNeeded: false,
    rules: {
      counter: value => value.length <= 10 || 'Max 10 characters',
    }
  }),
  methods: {
    displayModal(){
      this.showModal = true
    },
    setUsername(){
      if(this.usernameField.trim().length !== 0){
        this.$store.commit('setUsername', this.usernameField);
        this.showModal = false;
      }
    }
  }
}
</script>

<style scoped>

</style>