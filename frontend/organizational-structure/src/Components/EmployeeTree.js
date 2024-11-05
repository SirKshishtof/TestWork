import React, { useState } from "react";
import { fetchAllEmployees } from "../HttpRequest.js";

function fromArrToTree(employees) {
  const employeesMap = {};
  const tree = [];

  employees.forEach((employee) => {
      employeesMap[employee.employeeCode] = {
          ...employee,
          subordinates: [],
      };
  });

  employees.forEach((employee) => {
      if (employee.leaderCode !== -1) {
          if (employeesMap[employee.leaderCode] != null) {
              employeesMap[employee.leaderCode].subordinates.push(
                  employeesMap[employee.employeeCode]
              );
          }
      } else {
          tree.push(employeesMap[employee.employeeCode]);
      }
  });
  return tree;
}


const TreeNode = ({ node }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="tree-node">
            <div
                onClick={handleToggle}
                className={`node-toggle ${isExpanded ? "expanded" : ""}`}
            >
                {node.employeeCode} {node.lastName} {node.firstName} {node.middleName} {node.role}
            </div>
            {isExpanded && (
                <ul className="child-nodes">
                    {node.subordinates.map((childNode) => (
                        <li key={childNode.employeeCode}>
                            <TreeNode node={childNode} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const TreeView = () => {
    const [treeData, setTreeData] = React.useState([]);

    async function updateData() {
      let response = await fetchAllEmployees();
      if (response !== undefined) {
        setTreeData(fromArrToTree(response));
      }
    }

    React.useEffect(() => {
       updateData();
    },[] );
    return (
        <div>
            {treeData.map((rootNode) => (
                <TreeNode key={rootNode.id} node={rootNode} />
            ))}
        </div>
    );
};

export default TreeView;
