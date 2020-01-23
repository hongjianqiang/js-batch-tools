"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
const visitor = {
    BinaryExpression: {
        enter(path) {
            if (path.get('left').isIdentifier() && path.get('right').isIdentifier()) {
                const oper = path.node.operator;
                const left = path.get('left');
                const right = path.get('right');
                const leftClassDeclar = Object.keys(left.scope.bindings).find(key => core_1.types.isClassDeclaration(left.scope.bindings[key].path));
                const rightClassDeclar = Object.keys(right.scope.bindings).find(key => core_1.types.isClassDeclaration(right.scope.bindings[key].path));
                if (leftClassDeclar === rightClassDeclar && leftClassDeclar) {
                    const classDeclar = leftClassDeclar;
                    path.replaceWith(core_1.types.callExpression(core_1.types.memberExpression(core_1.types.identifier(classDeclar), core_1.types.stringLiteral(`operator${oper}`), true), [
                        path.node.left,
                        path.node.right
                    ]));
                }
            }
        }
    }
};
const pluginObj = {
    name: 'operator-reload',
    visitor,
    post(state) {
    }
};
function default_1() {
    return pluginObj;
}
exports.default = default_1;
