<template>
  <q-page class="flex flex-center bg-violet text-midnight">
    <q-form @submit="addnew" style="width:30%">
      <center>
        <div class="text-h4 text-midnight text-bold justify-center">
          Add a New Appointment
        </div>
        <br />
        <q-select
          v-model="pet"
          :options="optionspet"
          label="Pet: "
          lazy-rules
          :rules="[val => val || 'Field can not be blank']"
        />
        <q-input
          label="Description"
          label-color="midnight"
          v-model="description"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Comments"
          label-color="midnight"
          type="text-area"
          v-model="comments"
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-select
          v-model="prof"
          :options="optionsemp"
          label="Attended by: "
          lazy-rules
          :rules="[val => val || 'Field can not be blank']"
        />

        <br />
        <q-btn
          label="Add"
          type="submit"
          class="q-ma-xs"
          color="cadet"
          size="20px"
          rounded
        />
        <q-btn
          label="Cancel"
          to="/app/appointment"
          class=""
          color="cornflower"
          size="20px"
          rounded
        />
      </center>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      client: require("graphql-client")({
        url: "http://127.0.0.1:8000/graphql"
      }),
      description: null,
      comments: null,
      prof: null,
      pet: null,
      optionsemp: [],
      optionspet: []
    };
  },
  created() {
    var info = [];
    this.client
      .query(
        "query { allEmployees { edges { node { id, firstName, firstLname }  }   } }",
        {}
      )
      .then(function(body) {
        body.data.allEmployees.edges.forEach(element => {
          var temp = { label: "", value: "" };
          temp.label = element.node.firstName + " " + element.node.firstLname;
          temp.value = element.node.id;
          info.push(temp);
        });
      })
      .catch(function(err) {
        console.log("Error" + err.message);
      });
    this.optionsemp = info;
    var info2 = [];
    this.client
      .query(
        "query { allPets { edges { node { id, firstName, lastName }  }   } }",
        {}
      )
      .then(function(body) {
        body.data.allPets.edges.forEach(element => {
          var temp = { label: "", value: "" };
          temp.label = element.node.firstName + " " + element.node.lastName;
          temp.value = element.node.id;
          info2.push(temp);
        });
      })
      .catch(function(err) {
        console.log("Error" + err.message);
      });
    this.optionspet = info2;
  },
  methods: {
    addnew() {
      var namesplit = this.pet.label.split(" ");
      var petname = namesplit[0];
      var namesplit2 = this.prof.label.split(" ");
      var profn = namesplit2[0];
      const query = `
                mutation createAppointment ($petn: String!, $prof: String!, $description: String!, $comments: String!){
                    createAppointment(petn: $petn,prof: $prof, description: $description,comments: $comments){
                        new{
                            id
                        }
                    }
                }`,
        variables = {
          petn: petname,
          prof: profn,
          description: this.description,
          comments: this.comments
        };
      console.log(query, variables);
      this.client
        .query(query, variables)
        .then(function(body) {
          console.log(body);
        })
        .catch(function(err) {
          console.log("Error" + err.message);
        });
      //this.$router.push("/app/appointment");
    }
  }
};
</script>
