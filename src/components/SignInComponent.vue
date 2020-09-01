<template>
  <v-dialog
      persistent
      v-model="showModal"
      max-width="350"
  >
    <v-card>
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
                >

                </v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                    required
                    type="password"
                    label="Passphrase"
                />
              </v-row>
              <v-row justify="center">
                <v-btn color="primary" elevation="5">
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
  data: () => ({
    showModal: true,
    formValid: false
  }),
  methods: {
    async signIn(){
      // do sign in - set up session

    }
  }
}
</script>

<style scoped>

</style>