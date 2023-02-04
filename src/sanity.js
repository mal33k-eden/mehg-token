import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "55j3s382",
  dataset: "referrallink",
  // useCdn: true,
  token:
    "sk5kBhCiM4M3GKCUUy1REoBz2aE9LtW17IGMt9EG8AP5uiSvy4ePSMOU0JbJTmoSmDpZVJtxygiDsoq1425yF81ZCaWMSqFj90Eodcdx8Sb1Fm88xZLxQATncAZBO66n5IZk0MhBUZxxrbR1Hi8wgQntQAphHm9y2m9SIcIHto9JlO6NCLFM",
});
export default client;
