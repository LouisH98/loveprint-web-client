<template>
    <div>
        <v-dialog v-model="show">
            <template v-slot:activator="{ on, attrs }">
                <v-btn rounded v-on="on" v-bind="attrs">Generate Drawing</v-btn>
            </template>

            <v-card :loading="loading" @keypress.enter="() => generateImage()">
                <v-card-title>
                    What image would you like to generate?
                </v-card-title>
                <v-card-text>
                    <v-text-field :disabled="loading" label="A pencil drawing of:" v-model="imageToGenerate" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn :disabled="loading" @click="() => generateImage()" color="primary">Generate</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.VUE_APP_OPENAI_API_KEY,
});
export default {
    name: "GenerateImage",
    data: () => ({
        imageToGenerate: "",
        show: false,
        loading: false,
    }),
    methods: {
        async generateImage() {
            const openai = new OpenAIApi(configuration);

            this.loading = true;

            try {
                // generate image by calling API
                const response = await openai.createImage({
                    prompt: `a black and white 2d pencil drawing of ${this.imageToGenerate}`,
                    n: 1,
                    size: "256x256",
                    response_format: "b64_json"
                });

                const drawing = response.data.data[0]['b64_json'];
                this.$emit('image-changed', `data:image/png;base64,${drawing}`);

            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false;
                this.show = false;
            }



            this.imageToGenerate = "";
            this.show = false;
        }
    }
}
</script>