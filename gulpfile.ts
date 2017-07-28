import {Gulpclass, Task} from "gulpclass/Decorators";
import * as del from 'del';
import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as merge from 'merge2';
import {exec, spawn, execFile} from 'child_process';
import * as maps from 'gulp-sourcemaps';

const isWin = /^win/.test(process.platform);


var tsProject = ts.createProject('tsconfig.json');

@Gulpclass()
export class Gulpfile {
    exec(cmd: string, args: string[], complete: () => void = (() => { }), error: (e: any, status: number) => void = (() => { })) {
        console.log(`${cmd} ${args.join(" ")}`);
        const subshellFlag = isWin ? "/c" : "-c";
        const command = isWin ? [this.possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
        const ex = spawn(isWin ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true } as any);
        ex.on("exit", (code) => code === 0 ? complete() : error(undefined, code));
        ex.on("error", error);
    }

    possiblyQuote(cmd: string) {
        return cmd.indexOf(" ") >= 0 ? `"${cmd}"` : cmd;
    }

    @Task()
    clean() {
        return del(["./dist/**", "!./dist", "./server/**", "!./server"]);
    }

    @Task("swag", ["clean"])
    swag(cb: Function) {
        // This needs a callback chain because exec plays silly with gulp tasks
        return this.exec("tsoa swagger", [], () => cb());
    }

    @Task("routes", ["swag"])
    updateRoutes(cb: Function) {
        // This needs a callback chain because exec plays silly with gulp tasks
        return this.exec("tsoa routes", [], () => cb());
    }

    @Task("typescript", ["swag"])
    typescript(cb: Function) {
        return this.exec("tsc", [], () => cb());
    }
    
    @Task("default", ["routes", "typescript"])
    default() {

    }
}