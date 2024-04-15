<template>
  <select @change="stationChanged($event.target.value)">
    <option v-for="station in trimmedStations" :key="station.id" :value="station.id">
      {{ station.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    stations: Array
  },
  // Using data() to create a new paramenter based off the "stations" prop
  // so that its value can be changed to remove the last station which name is set to:
  // "name": "station-name{{i}}" (value will be sliced in the handler method under 'watch')
  data() {
    return {
      trimmedStations: this.stations
    }
  },
  // stationChanged method changes the station value by searching its ID 
  // by being selected among the options in the dropdown menu and then emits the 
  // stationId and station.name to App.vue to be used by other components.
  methods: {
    stationChanged(stationId) {
      const station = this.stations.find(station => station.id === stationId);
      this.$emit('station-selected', stationId, station ? station.name : null);
    }
  },
  // handler function set to activate when the component mounts so that the station value 
  // gets populated without needing the first interaction by the user(selecting a station).
  // Without this the bookings won't show automatically in the calendar on page load.
  watch: {
    stations: {
      immediate: true,
      handler(stations) {
        if (stations.length > 0) {
          this.stationChanged(stations[0].id);
          // slicing off the last position from "stations" prop
          this.trimmedStations = this.stations.slice(0, this.stations.length - 1)
        }
      }
    }
  }
};
</script>