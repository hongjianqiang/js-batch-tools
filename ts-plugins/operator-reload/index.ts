import { PluginObj, Visitor, types as t } from '@babel/core';

const visitor: Visitor = {
  BinaryExpression: {
    enter(path) {
      if( path.get('left').isIdentifier() && path.get('right').isIdentifier() ) {
        const oper      = path.node.operator;
        const left:any  = path.get('left');
        const right:any = path.get('right');

        const leftClassDeclar  = Object.keys(left.scope.bindings).find(key => t.isClassDeclaration(left.scope.bindings[key].path))
        const rightClassDeclar = Object.keys(right.scope.bindings).find(key => t.isClassDeclaration(right.scope.bindings[key].path))

        if (leftClassDeclar === rightClassDeclar && leftClassDeclar) {
          const classDeclar = leftClassDeclar
          
          path.replaceWith(
            t.callExpression(
              t.memberExpression(t.identifier(classDeclar), t.stringLiteral(`operator${oper}`), true), 
            [
              path.node.left,
              path.node.right
            ])
          )
        }
      }
    }
  }
}

const pluginObj: PluginObj = {
  name: 'operator-reload',

  visitor,

  post(state) {
  }
}

export default function() {
  return pluginObj
}
