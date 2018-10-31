<?php

$conn = require_once 'connect.php';

class DB {

    protected $conn;
    protected $job_list = [];

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getTask()
    {
        $sql = 'SELECT * FROM todo';
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $this->job_list[] = [
                    'id' => $row['id'],
                    'position' => $row['position'],
                    'name' => $row['name']
                ];
            }
            $this->sortJobList();
        } else {
            die('No records');
        }

        return $this->job_list;
    }

    public function updateTask($payload)
    {
        foreach ($payload as $job) {
            $sql = 'UPDATE todo SET position = ' . (int) $job->position . ' WHERE id = ' . (int) $job->id;
            if ($this->conn->query($sql) === false) {
                die('Error updating record: ' . $this->conn->error);
            }
        }
        return true;
    }

    protected function sortJobList()
    {
        usort($this->job_list, function($a, $b) {
            return $a['position'] - $b['position'];
        });
    }
}
