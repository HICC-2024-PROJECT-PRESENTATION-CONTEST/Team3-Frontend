session=github-actions-hicc-frontend
tmux has-session -t $session || tmux new-session -d -s $session
tmux set-option -t $session -p remain-on-exit
tmux send-keys -t $session C-c
tmux send-keys -t $session "bash" C-m
tmux send-keys -t $session "cd $PWD" C-m
tmux send-keys -t $session "npm run start" C-m