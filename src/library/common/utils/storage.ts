export default class Storage {
	private static readonly prefix = 'benchmark/';

	public static getItem(name: string) {
		return JSON.parse(localStorage.getItem(this.prefix + name) as any);
	}

	public static setItem(name: string, value: string) {
		localStorage.setItem(this.prefix + name, JSON.stringify(value));
	}

	public static removeItem(name: string) {
		localStorage.removeItem(this.prefix + name);
	}
}
