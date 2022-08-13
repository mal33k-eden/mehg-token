import sanityClient from "@sanity/client";

const client =  sanityClient({
    projectId:"p0q0n2s1",
    dataset:"production",
    useCdn: true,
})
export default client