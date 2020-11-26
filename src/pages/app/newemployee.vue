<template>
  <q-page class="flex flex-center bg-violet text-midnight">
    <q-form @submit="addnew" style="width:30%">
      <center>
        <div class="text-h4 text-midnight text-bold justify-center">
          Add a New Employee
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
          label="Middle Name"
          label-color="midnight"
          v-model="middle_name"
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="First Last Name"
          label-color="midnight"
          v-model="first_lname"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Second Last Name"
          label-color="midnight"
          v-model="second_lname"
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        />
        <q-input
          label="Email"
          label-color="midnight"
          v-model="email"
          type="email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        >
          <template v-slot:before>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          label="Specialty: "
          label-color="midnight"
          v-model="specialty"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Field can not be blank']"
        >
          <template v-slot:before> <q-icon name="school" /> </template
        ></q-input>
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
          to="/app/employee"
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
      middle_name: null,
      first_lname: null,
      second_lname: null,
      email: null,
      specialty: null
    };
  },
  methods: {
    addnew() {
      console.log(
        this.first_name,
        this.second_lname,
        this.first_lname,
        this.middle_name,
        this.email,
        this.specialty
      );
      const query = `
                mutation createEmployee ($firstName: String!, $middleName: String!, $firstLname: String!, $secondLname: String!, $email: String!, $specialty: String!){
                    createEmployee(firstName: $firstName,middleName: $middleName, firstLname: $firstLname,secondLname: $secondLname, email: $email, specialty: $specialty){
                        new{
                            id
                        }
                    }
                }`,
        variables = {
          firstName: this.first_name,
          middleName: this.middle_name,
          firstLname: this.first_lname,
          secondLname: this.second_lname,
          email: this.email,
          specialty: this.specialty
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
      this.$router.push("/app/employee");
    }
  }
};
</script>
