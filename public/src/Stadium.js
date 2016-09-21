export default class Stadium {
    discs = [];
    goals = [];
    planes = [];
    segments = [];
    vertexes = [];

    static parse(json) {
        this.discs = json.discs;
        this.goals = json.goals;
        this.planes = json.planes;
        this.segments = json.segments;
        this.vertexes = json.vertexes;
    }
}
