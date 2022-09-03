import sanityClient from "@sanity/client";

const client =  sanityClient({
    projectId:"p0q0n2s1",
    dataset:"production",
    // useCdn: true,
    token:'sk5WxWZtzNnsjKuT3stjmHsO6lnE1QNQ6p90c4zoNO9zJW1Q6XJBpgKmfR6jVCvPHsBg8NxDVCSHwKQ8BXnXvpwZbJomR58x59g7LhtTbLtBBV56Df5bQdCDQpe4LDKwCqXSzKgAwp12gI9BddwBaGc4rcdEVr9RlxeXBi4NYmfoksPwu8ho'
})
export default client