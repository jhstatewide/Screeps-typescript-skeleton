/// <reference path="_references.ts" />

class CreepManager {
	static memory(name: string): CreepMemory {
		var creep = Game.creeps[name]
		return creep ? creep.memory : null;
	}
	static registerCreep(name: string) {
		var memory = this.memory(name);
		memory.role = CreepRole.none
		memory.status = CreepStatus.idle;
	}
	/**
	 * Checks input id list for creeps that have spawning status but are finished
	 * @param ids list of creep ids to check
	 * @returns returns the list of objects that are still spawning, not creeps, or that don't have a status of spawning
	 */
	static main(names: string[]) {
		names.forEach(name => {
			var memory = this.memory(name);
			if (!memory) return;
			if (!_.isNumber(memory.role)) {
				console.log("registering creep " + name);
				CreepManager.registerCreep(name);
			}
		});
	}
}
interface CreepMemory {
	role: CreepRole;
	status: CreepStatus;
}
enum CreepStatus {
	idle,
	returning,
	leaving,
	mining
}
enum CreepRole {
	none,
	harvester
}
class BodyParts {
	static MOVE = "move";
	static WORK = "work";
	static CARRY = "carry";
	static ATTACK = "attack";
	static RANGED_ATTACK = "ranged_attack";
	static TOUGH = "tough";
	static HEAL = "heal";
}