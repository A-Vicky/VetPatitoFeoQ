<template>
  <q-page class="bg-violet text-midnight">
    <q-btn
      rounded
      label="Add Pet"
      icon="pets"
      color="cadet"
      style="margin-left:80%;margin-top:3%"
      to="/app/newpet"
    ></q-btn>
    <q-separator horizontal class="transparent" />
    <center>
      <q-table
        grid
        card-class="bg-midnight text-white"
        title="Pets"
        :data="data"
        :columns="columns"
        row-key="name"
        hide-header
        style="width:80%"
      >
      </q-table>
    </center>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      client: require("graphql-client")({
        url: "http://127.0.0.1:8000/graphql"
      }),
      columns: [
        {
          name: "name",
          required: true,
          label: "Name: ",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: "breed", label: "Breed:", field: "breed", sortable: true },
        { name: "colors", label: "Color: ", field: "colors", sortable: true },
        {
          name: "behavior",
          label: "Behavior:",
          field: "behavior",
          sortable: true
        },
        { name: "age", label: "Age: ", field: "age", sortable: true },
        { name: "owner", label: "Owner: : ", field: "owner", sortable: true }
      ],
      data: []
    };
  },
  created() {
    var info = [];
    this.client
      .query(
        "query { allPets { edges { node { id, firstName, lastName, breed, colors, behavior, age, owner { firstName, firstLname} }  }   } }",
        {}
      )
      .then(function(body) {
        console.log(body);
        body.data.allPets.edges.forEach(element => {
          var temp = {
            name: "",
            breed: "",
            colors: "",
            behavior: "",
            age: 0,
            owner: ""
          };
          temp.name = element.node.firstName + " " + element.node.lastName;
          temp.breed = element.node.breed;
          temp.colors = element.node.colors;
          temp.behavior = element.node.behavior;
          temp.age = element.node.age;
          temp.owner =
            element.node.owner.firstName + " " + element.node.owner.firstLname;
          console.log(temp);
          info.push(temp);
        });
      })
      .catch(function(err) {
        console.log("Error" + err.message);
      });
    this.data = info;
  }
};
</script>
