<template>
  <q-page class="flex flex-center bg-violet text-midnight">
    <q-form @submit="addnew" style="width:30%">
      <center>
        <div class="text-h4 text-midnight text-bold justify-center">
          Add a New Pet
        </div>
        <br />
        <q-input
          label="First Name"
          label-color="midnight"
          v-model="first_name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Last Name"
          label-color="midnight"
          v-model="last_name"
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Breed"
          label-color="midnight"
          v-model="breed"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Color"
          label-color="midnight"
          v-model="colors"
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Behavior"
          type="textarea"
          label-color="midnight"
          v-model="behavior"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Age: "
          label-color="midnight"
          v-model="age"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-select
          v-model="owner"
          :options="options"
          label="Owner"
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
          to="/app/pet"
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
      first_name: null,
      last_name: null,
      breed: null,
      colors: null,
      behavior: null,
      age: null,
      owner: null,
      options: []
    };
  },
  created() {
    var info = [];
    this.client
      .query(
        "query { allOwners { edges { node { id, firstName, firstLname }  }   } }",
        {}
      )
      .then(function(body) {
        console.log(body);
        body.data.allOwners.edges.forEach(element => {
          var temp = { label: "", value: "" };
          temp.label = element.node.firstName + " " + element.node.firstLname;
          temp.value = element.node.id;
          console.log(temp);
          info.push(temp);
        });
      })
      .catch(function(err) {
        console.log("Error" + err.message);
      });
    this.options = info;
  },
  methods: {
    addnew() {
      var namesplit = this.owner.label.split(" ");
      var fn = namesplit[0];
      const query = `
                mutation createPet ($firstName: String!, $lastName: String!, $breed: String!, $colors: String!, $behavior: String!, $age: String!, $ownerfn: String!){
                    createPet(firstName: $firstName,lastName: $lastName, breed: $breed,colors: $colors, behavior: $behavior, age: $age, ownerfn: $ownerfn){
                        new{
                            id
                        }
                    }
                }`,
        variables = {
          firstName: this.first_name,
          lastName: this.last_name,
          breed: this.breed,
          colors: this.colors,
          behavior: this.behavior,
          age: this.age,
          ownerfn: fn
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
      this.$router.push("/app/pet");
    }
  }
};
</script>
