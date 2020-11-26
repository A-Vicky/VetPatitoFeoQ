<template>
  <q-page class="bg-violet text-midnight">
    <q-btn
      rounded
      label="Add Employee"
      icon="group_add"
      color="cadet"
      style="margin-left:80%;margin-top:3%"
      to="/app/newemployee"
    ></q-btn>
    <q-separator horizontal class="transparent" />
    <center>
      <q-table
        grid
        card-class="bg-midnight text-white"
        title="Employees"
        :data="employ"
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
        {
          name: "specialty",
          label: "Specialty:",
          field: "specialty",
          sortable: true
        },
        { name: "email", label: "Email: ", field: "email", sortable: true }
      ],
      employ: []
    };
  },
  created() {
    var info = [];
    this.client
      .query(
        "query { allEmployees { edges { node { id, firstName, middleName, firstLname, secondLname, specialty, email }  }   } }",
        {}
      )
      .then(function(body) {
        console.log(body);
        body.data.allEmployees.edges.forEach(element => {
          var temp = { name: "", specialty: "", email: "" };
          temp.name =
            element.node.firstName +
            " " +
            element.node.middleName +
            " " +
            element.node.firstLname +
            " " +
            element.node.secondLname;
          temp.specialty = element.node.specialty;
          temp.email = element.node.email;
          console.log(temp);
          info.push(temp);
        });
      })
      .catch(function(err) {
        console.log("Error" + err.message);
      });
    this.employ = info;
  }
};
</script>
